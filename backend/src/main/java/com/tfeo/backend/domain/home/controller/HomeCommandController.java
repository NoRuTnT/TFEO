package com.tfeo.backend.domain.home.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.home.service.HomeCommandServiceImpl;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/home")
public class HomeCommandController {
	private final HomeCommandServiceImpl homeCommandService;

	//담당자가 집 등록 - 담당자
	@PostMapping("")
	public ResponseEntity<SuccessResponse> homeAdd() {
		homeCommandService.addHome();
		return null;
	}

	//비회원 등록 - 비회원
	@PostMapping("/none-member")
	public ResponseEntity<SuccessResponse> homeAppliedByNoneMemberAdd() {
		homeCommandService.addHomeAppliedByNoneMember();
		return null;
	}

	//등록된 집 정보 수정 - 담당자
	@PutMapping("")
	public ResponseEntity<SuccessResponse> homeModify() {
		homeCommandService.modifyHome();
		return null;
	}

	//등록된 집 정보 삭제 - 담당자
	@DeleteMapping("")
	public ResponseEntity<SuccessResponse> homeRemove() {
		homeCommandService.removeHome();
		return null;
	}

	//비회원 집 등록 승인 - 담당자
	@PutMapping("/regist-approval")
	public ResponseEntity<SuccessResponse> homeNoneMemberRegistrationApprove() {
		homeCommandService.approveHomeNoneMemberRegistration();
		return null;
	}

	//비회원 집 등록 거절 - 담당자
	@PutMapping("/regist-refusal")
	public ResponseEntity<SuccessResponse> homeNoneMemberRegistrationRefuse() {
		homeCommandService.refuseHomeNoneMemberRegistration();
		return null;
	}

	//학생 룸쉐어링 신청 승인 - 담당자
	@PutMapping("/apply-approval")
	public ResponseEntity<SuccessResponse> homeApplicationApproval() {
		homeCommandService.approveHomeApplication();
		return null;
	}

	//학생 룸쉐어링 신청 거절 - 담당자
	@PutMapping("/apply-refusal")
	public ResponseEntity<SuccessResponse> homeApplicationRefusal() {
		homeCommandService.refuseHomeApplication();
		return null;
	}
}
