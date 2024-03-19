package com.tfeo.backend.domain.member.controller;

import java.util.List;

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
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.dto.MyHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.SmsRequestDto;
import com.tfeo.backend.domain.member.model.dto.SmsVerifyDto;
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

	//회원 상세정보 수정
	@PutMapping("")
	public ResponseEntity<SuccessResponse> memberModify(@RequestBody MemberRequestDto memberRequestDto) {
		//Todo: 구현 해야 한다.
		memberService.modifyMember(temporaryMemberNo, memberRequestDto);
		return null;
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

	// 회원이 신청한 집 리스트 조회
	@GetMapping("/home")
	public ResponseEntity<SuccessResponse> AppliedHomeList() {
		List<AppliedHomeResponseDto> appliedHomeResponseDtoList = memberService.findAppliedHomeList(temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(appliedHomeResponseDtoList)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원이 집을 신청한다
	@PostMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> homeApplicationAdd(@PathVariable Long homeNo) {
		memberService.addHomeApplication(homeNo, temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("집 신청이 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	@DeleteMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> memberRequestedHomeRemove(@PathVariable Long homeNo) {
		memberService.deleteApplication(homeNo, temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("집 신청이 취소되었습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	// 회원이 계약 완료하여 현재 살고 있는 집 조회
	@GetMapping("/home/myhome")
	public ResponseEntity<SuccessResponse> myHomeDetails() {
		//Todo: auth 적용 이후 memberNo
		MyHomeResponseDto myHomeResponseDto = memberService.findMyHomeDetails(temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(myHomeResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);
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
