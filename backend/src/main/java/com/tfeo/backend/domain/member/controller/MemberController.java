package com.tfeo.backend.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberHomeApplicationRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.dto.SmsRequestDto;
import com.tfeo.backend.domain.member.model.dto.SmsVerifyDto;
import com.tfeo.backend.domain.member.model.dto.SurveyRequestDto;
import com.tfeo.backend.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

	private final MemberService memberService;

	//auth 적용 이전 임시
	private final Long temporaryMemberNo = 1L;

	//회원 상세정보 조회
	@GetMapping("")
	//Todo: Auth 적용 이후 memberId 갱신
	public ResponseEntity<SuccessResponse> memberDetails() {
		MemberResponseDto memberResponseDto = memberService.findMember(temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(memberResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원 설문조사 제출
	@PostMapping("/survey")
	public ResponseEntity<SuccessResponse> memberSurvey(@RequestBody SurveyRequestDto memberSurveyRequestDto) {
		//Todo: Auth 적용 이후 memberNo 갱신
		memberService.submitSurvey(memberSurveyRequestDto, temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("설문 제출이 완료되었습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원 상세정보 수정
	@PutMapping("")
	public ResponseEntity<SuccessResponse> memberModify(@RequestBody MemberRequestDto memberRequestDto) {
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(memberService.modifyMember(temporaryMemberNo, memberRequestDto))
			.build());
	}

	//회원 탈퇴
	@DeleteMapping("")
	public ResponseEntity<SuccessResponse> memberRemove() {
		//Todo: auth memberId 적용
		memberService.deleteMember(temporaryMemberNo);
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK).message("회원 탈퇴가 완료되었습니다.")
			.build());
	}

	// 회원이 신청한 집(계약) 조회
	@GetMapping("/home")
	public ResponseEntity<SuccessResponse> AppliedHomeList() {
		AppliedHomeResponseDto appliedHomeResponseDto = memberService.findAppliedHome(temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(appliedHomeResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원이 집을 신청한다
	@PostMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> homeApplicationAdd(@PathVariable Long homeNo,
		@RequestBody MemberHomeApplicationRequestDto memberHomeApplicationRequestDto) {
		memberService.addHomeApplication(homeNo, temporaryMemberNo, memberHomeApplicationRequestDto);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("집 신청이 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//집 신청 취소
	@DeleteMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> memberRequestedHomeRemove(@PathVariable Long homeNo) {
		memberService.deleteApplication(homeNo, temporaryMemberNo);
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
	public ResponseEntity<SuccessResponse> memberApprove(@PathVariable("memberNo") Long memberNo) {
		memberService.approveMember(memberNo);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("학생이 승인되었습니다.").build());
	}

	// 담당자가 학생 거절상태로 바꿈
	@PutMapping("/reject/{memberNo}")
	public ResponseEntity<SuccessResponse> memberReject(@PathVariable("memberNo") Long memberNo) {
		memberService.rejectMember(memberNo);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("학생이 거절되었습니다.").build());
	}

	//sms 인증번호 요청
	@PostMapping("sms-request")
	public ResponseEntity<SuccessResponse> smsRequest(@RequestBody SmsRequestDto smsRequestDto) {
		SingleMessageSentResponse response = memberService.requestSms(smsRequestDto);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).result(response).build());
	}

	//sms 인증번호 확인
	@PostMapping("sms-verify")
	public ResponseEntity<SuccessResponse> smsVerify(@RequestBody SmsVerifyDto smsVerifyDto) {
		memberService.verifySms(smsVerifyDto);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("인증이 성공했습니다.").build());
	}
}
