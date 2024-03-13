package com.tfeo.backend.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

	private final MemberService memberService;

	//회원 상세정보 조회
	@GetMapping("")
	//Todo: Auth 적용 이후 memberId 갱신
	public ResponseEntity<SuccessResponse> memberDetails() {
		MemberResponseDto memberResponseDto = memberService.findMember();
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(memberResponseDto)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	//회원 상세정보 수정
	@PutMapping("")
	public ResponseEntity<SuccessResponse> memberModify(@RequestPart("certification") MultipartFile certificate,
		@RequestPart("profileImage") MultipartFile profileImage,
		@RequestPart("member") MemberRequestDto memberRequestDto) {
		//s3 업로드예정
		return null;
	}

	//회원 탈퇴
	@DeleteMapping("")
	public ResponseEntity<SuccessResponse> memberRemove() {
		//Todo: auth memberId 적용
		memberService.deleteMember();
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK).message("회원 탈퇴가 완료되었습니다.")
			.build());
	}

	// 회원이 신청한 집 리스트 조회
	// Todo: 무한스크롤?
	@GetMapping("/home")
	public ResponseEntity<SuccessResponse> memberRequestedHomeList(@PathVariable Integer memberNo) {
		return null;
	}

	//회원이 집을 신청한다
	@PostMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> homeApplicationAdd(@PathVariable Integer homeNo) {
		return null;
	}

	@DeleteMapping("/home/{homeNo}")
	public ResponseEntity<SuccessResponse> memberRequestedHomeRemove(@PathVariable Integer homeNo) {
		return null;
	}

	// 회원이 계약 완료하여 현재 살고 있는 집 조회
	@GetMapping("/home/myhome")
	public ResponseEntity<SuccessResponse> myHomeDetails() {
		return null;
	}

	//sms 인증번호 요청
	@PostMapping("sms-request")
	public ResponseEntity<Void> smsRequest() {
		return null;
	}

	//sms 인증번호 확인
	@PostMapping("sms-verify")
	public ResponseEntity<Void> smsVerify() {
		return null;
	}
}
