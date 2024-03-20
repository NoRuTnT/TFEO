package com.tfeo.backend.domain.home.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.home.service.HomeQueryServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class HomeQueryController {
	private final HomeQueryServiceImpl homeQueryService;

	//등록된 집 목록 조회 - 회원, 비회원, 담당자
	@GetMapping("")
	public ResponseEntity<SuccessResponse> homeList() {
		homeQueryService.findHomeList();
		return null;
	}

	//집 정보 상세 조회 - 회원, 비회원, 담당
	@GetMapping("/{homeNo}")
	public ResponseEntity<SuccessResponse> homeDetails(@PathVariable Long homeNo) {
		homeQueryService.findHomeDetails();
		return null;
	}

	//비회원 신청 목록 조회 - 담당자
	@GetMapping("/regist")
	public ResponseEntity<SuccessResponse> homeNoneMemberList() {
		homeQueryService.findHomeNoneMemberList();
		return null;
	}

	// 계약 진행 중인 집 목록 조회 - 담당자
	@GetMapping("/in-progress")
	public ResponseEntity<SuccessResponse> homeInProgressList() {
		homeQueryService.findHomeInProgressList();
		return null;
	}

	// 계약 완료된 집 목록 조회 - 담당자
	@GetMapping("/completion")
	private ResponseEntity<SuccessResponse> homeCompletionList() {
		homeQueryService.findHomeCompletionList();
		return null;
	}

	//해당 집에 룸쉐어링 신청한 학생 목록 조회 - 담당자
	@GetMapping("/applicants/{homeNo}")
	public ResponseEntity<SuccessResponse> homeAppliedMemberList(@PathVariable("homeNo") Long homeNo) {
		homeQueryService.findHomeAppliedMemberList();
		return null;
	}

}
