package com.tfeo.backend.common.handler;

import static com.tfeo.backend.common.model.type.Role.*;

import java.io.IOException;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.tfeo.backend.common.config.PathProperty;
import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.member.model.dto.auth.CustomOAuth2User;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberPersonalityRepository;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.member.service.JwtService;
import com.tfeo.backend.domain.member.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
//@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtService jwtService;
	private final RedisService redisService;
	private final MemberRepository memberRepository;
	private final PathProperty pathProperty;
	private final MemberPersonalityRepository memberPersonalityRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		log.info("OAuth2 Login 성공!");
		try {
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("authentication:{}", authentication);
			CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
			loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
		} catch (Exception e) {
			throw e;
		}
	}

	private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
		//로그인하면 이전토큰유무에상관없이 새로발급 토큰2개생성
		String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(), oAuth2User.getRole().name());
		String refreshToken = jwtService.createRefreshToken(oAuth2User.getEmail(), oAuth2User.getRole().name());
		String email = oAuth2User.getEmail();

		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new EntityNotFoundException("해당이메일은 가입되지않은 이메일입니다: " + email));

		if (member.getMemberPersonality() == null) {
			MemberPersonality newMemberPersonality = new MemberPersonality();
			memberPersonalityRepository.save(newMemberPersonality);
			member.setMemberPersonality(newMemberPersonality);
		}

		memberRepository.save(member);
		//쿠키생성
		jwtService.sendAccessToken(response, accessToken);
		jwtService.sendRefreshToken(response, refreshToken);
		//redis에 리프레쉬토큰저장
		jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);

		Role role = member.getRole();
		String redirectUrl = "/home";
		if (member.getMemberPersonality().getCold() == null) {
			redirectUrl = "/survey";
		}
		if (MANAGER.equals(role)) {
			redirectUrl = "/manage-home";
		}
		response.sendRedirect(redirectUrl);

	}
}