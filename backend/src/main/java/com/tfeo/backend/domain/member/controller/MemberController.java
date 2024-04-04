package com.tfeo.backend.domain.member.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberHomeApplicationRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.dto.SmsRequestDto;
import com.tfeo.backend.domain.member.model.dto.SmsVerifyDto;
import com.tfeo.backend.domain.member.model.dto.SurveyRequestDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.member.service.JwtService;
import com.tfeo.backend.domain.member.service.MemberService;
import com.tfeo.backend.domain.member.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

	private final JwtService jwtService;
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final MemberService memberService;
	private final AuthenticationService authenticationService;

	@GetMapping("/status")
	public ResponseEntity<?> getAuthStatus() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		boolean isAnonymous = authentication instanceof AnonymousAuthenticationToken;
		boolean isAuthenticated = authentication != null && authentication.isAuthenticated() && !isAnonymous;

		return ResponseEntity.ok(Collections.singletonMap("isAuthenticated", isAuthenticated));
	}

	@GetMapping("/detail")
	public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
		Optional<String> jwtdetail = jwtService.extractEmailFromAccessToken(request);

		if (jwtdetail.isPresent()) {
			Optional<Member> emaildetail = memberRepository.findByEmail(jwtdetail.get());

			if (emaildetail.isPresent()) {
				Member member = emaildetail.get();
				Map<String, Object> memberInfo = new HashMap<>();
				memberInfo.put("name", member.getName());
				memberInfo.put("email", member.getEmail());
				memberInfo.put("memberNo", member.getMemberNo());
				memberInfo.put("college", member.getCollege());
				memberInfo.put("lat", member.getLat());
				memberInfo.put("lng", member.getLng());
				memberInfo.put("role", member.getRole());

				return ResponseEntity.ok(memberInfo);
			} else {
				return ResponseEntity.status(404).body("가입된 사용자데이터를 찾을수없습니다.");
			}
		} else {
			return ResponseEntity.status(400).body("유효한 토큰을 찾을수없습니다");
		}
	}

	@GetMapping("/reaccesstoken")
	public ResponseEntity<?> reAccessToken(HttpServletRequest request, HttpServletResponse response) throws
		IOException {

		String refreshToken = jwtService.extractRefreshToken(request).orElse(null);

		Optional<String> jwtemail = jwtService.extractEmailFromRefreshToken(request);
		Optional<String> jwtrole = jwtService.extractroleFromRefreshToken(request);
		String email = jwtemail.get();
		String role = jwtrole.get();
		log.info("role:{}", role);

		String redisrefreshToken = redisService.getRefreshToken(email).get();
		log.info("refreshToken:{}", refreshToken);
		log.info("redisrefreshToken:{}", redisrefreshToken);
		if (redisrefreshToken != null) {
			if (redisService.isBlacklisted(redisrefreshToken)) {
				response.sendError(HttpStatus.UNAUTHORIZED.value(), "만료된 refresh 토큰입니다. 다시로그인해주세요");
			} else {
				if (refreshToken.equals(redisrefreshToken)) {
					String accessToken = jwtService.createAccessToken(email, "USER"); //서비스확장시 role 부여수정필요
					jwtService.sendAccessToken(response, accessToken);
					return ResponseEntity.ok("accessToken:" + accessToken);
				} else {
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
						.body("유효하지않은 접근입니다. 다시 로그인해주세요.");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body("만료된 refresh 토큰입니다. 다시 로그인해주세요.");
		}
		return ResponseEntity.ok("ok");
	}

	//회원 상세정보 조회
	@GetMapping("")
	public ResponseEntity<?> memberDetails(HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		MemberResponseDto memberResponseDto = memberService.findMember(memberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(memberResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);

	}

	//회원 설문조사 제출
	@PostMapping("/survey")
	public ResponseEntity<?> memberSurvey(@RequestBody SurveyRequestDto memberSurveyRequestDto,
		HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		memberService.submitSurvey(memberSurveyRequestDto, memberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("설문 제출이 완료되었습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원 상세정보 수정
	@PutMapping("")
	public ResponseEntity<?> memberModify(@RequestBody MemberRequestDto memberRequestDto, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(memberService.modifyMember(memberNo, memberRequestDto))
			.build());
	}

	//회원 탈퇴
	@DeleteMapping("")
	public ResponseEntity<?> memberRemove(HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}

		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		memberService.deleteMember(memberNo);
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK).message("회원 탈퇴가 완료되었습니다.")
			.build());
	}

	// 회원이 신청한 집(계약) 조회
	@GetMapping("/home")
	public ResponseEntity<?> AppliedHomeList(HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		AppliedHomeResponseDto appliedHomeResponseDto = memberService.findAppliedHome(memberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(appliedHomeResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원이 집을 신청한다
	@PostMapping("/home/{homeNo}")
	public ResponseEntity<?> homeApplicationAdd(@PathVariable Long homeNo,
		@RequestBody MemberHomeApplicationRequestDto memberHomeApplicationRequestDto, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		memberService.addHomeApplication(homeNo, memberNo, memberHomeApplicationRequestDto);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("집 신청이 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//집 신청 취소
	@DeleteMapping("/home/{homeNo}")
	public ResponseEntity<?> memberRequestedHomeRemove(@PathVariable Long homeNo, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		memberService.deleteApplication(homeNo, memberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("집 신청이 취소되었습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	// 담당자가 미승인 상태의 학생 확인
	@GetMapping("/approve-list")
	public ResponseEntity<SuccessResponse> memberApprovalList() {
		return ResponseEntity.ok(
			SuccessResponse.builder().status(HttpStatus.OK).result(memberService.findMemberApprovalList()).build());
	}

	// 담당자가 학생 승인상태로 바꿈
	@PutMapping("/approve/{memberNo}")
	public ResponseEntity<SuccessResponse> memberApprove(@PathVariable("memberNo") Long memberNo,
		HttpServletRequest request) {
		memberService.approveMember(memberNo);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("학생이 승인되었습니다.").build());
	}

	// 담당자가 학생 거절상태로 바꿈
	@PutMapping("/reject/{memberNo}")
	public ResponseEntity<SuccessResponse> memberReject(@PathVariable("memberNo") Long memberNo,
		HttpServletRequest request) {
		memberService.rejectMember(memberNo);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("학생이 거절되었습니다.").build());
	}

	//sms 인증번호 요청
	@PostMapping("sms-request")
	public ResponseEntity<SuccessResponse> smsRequest(@RequestBody SmsRequestDto smsRequestDto,
		HttpServletRequest request) {
		SingleMessageSentResponse response = memberService.requestSms(smsRequestDto);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).result(response).build());
	}

	//sms 인증번호 확인
	@PostMapping("sms-verify")
	public ResponseEntity<SuccessResponse> smsVerify(@RequestBody SmsVerifyDto smsVerifyDto,
		HttpServletRequest request) {
		memberService.verifySms(smsVerifyDto);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("인증이 성공했습니다.").build());
	}
}
