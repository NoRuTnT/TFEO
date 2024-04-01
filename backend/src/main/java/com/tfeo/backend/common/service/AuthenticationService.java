package com.tfeo.backend.common.service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.member.service.JwtService;

@Service
public class AuthenticationService {

	private final JwtService jwtService;
	private final MemberRepository memberRepository;

	@Autowired
	public AuthenticationService(JwtService jwtService, MemberRepository memberRepository) {
		this.jwtService = jwtService;
		this.memberRepository = memberRepository;
	}

	public Optional<Member> getMember(HttpServletRequest request) {
		// JWT에서 이메일 추출
		Optional<String> emailOptional = jwtService.extractEmailFromAccessToken(request);

		if (!emailOptional.isPresent()) {
			// 유효한 이메일이 JWT에 없음
			return Optional.empty();
		}
		return memberRepository.findByEmail(emailOptional.get());
	}
}