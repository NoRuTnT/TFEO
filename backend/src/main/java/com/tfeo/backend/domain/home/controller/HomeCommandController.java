package com.tfeo.backend.domain.home.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;
import com.tfeo.backend.domain.home.service.HomeCommandServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/home")
public class HomeCommandController {
	private final HomeCommandServiceImpl homeCommandService;

	//담당자가 집 등록 - 담당자
	@PostMapping("")
	public ResponseEntity<SuccessResponse> homeAdd(@RequestBody HomeRequestDto request) {
		HomeResponseDto homeResponseDto = homeCommandService.addHome(request);
		return ResponseEntity.ok(
			SuccessResponse.builder()
				.status(HttpStatus.OK)
				.message("집 정보 등록이 성공했습니다.")
				.result(homeResponseDto)
				.build());
	}

	//비회원 등록 - 비회원
	@PostMapping("/none-member")
	public ResponseEntity<SuccessResponse> homeAppliedByNoneMemberAdd(@RequestBody HomeDto request) {
		//Todo: 최후순위 개발
		homeCommandService.addHomeAppliedByNoneMember(request);
		return null;
	}

	//등록된 집 정보 수정 - 담당자
	@PutMapping("homeNo")
	public ResponseEntity<SuccessResponse> homeModify(@PathVariable("homeNo") Long homeNo,
		@RequestBody HomeRequestDto request) {
		HomeResponseDto homeResponseDto = homeCommandService.modifyHome(homeNo, request);
		return ResponseEntity.ok(
			SuccessResponse.builder()
				.status(HttpStatus.OK)
				.message("집 정보가 수정되었습니다.")
				.result(homeResponseDto)
				.build());
	}

	//등록된 집 정보 삭제 - 담당자
	@DeleteMapping("/{homeNo}")
	public ResponseEntity<SuccessResponse> homeRemove(@PathVariable Long homeNo) {
		homeCommandService.removeHome(homeNo);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("집 정보가 삭제되었습니다.").build());
	}

	//비회원 집 등록 승인 - 담당자
	@PutMapping("/regist-approval")
	public ResponseEntity<SuccessResponse> homeNoneMemberRegistrationApprove(Long homeNo) {
		homeCommandService.approveHomeNoneMemberRegistration(homeNo);
		return ResponseEntity.ok(
			SuccessResponse.builder().status(HttpStatus.OK).message("집 등록이 승인되었습니다. homeNo: " + homeNo).build());
	}

	//비회원 집 등록 거절 - 담당자
	@DeleteMapping("/regist-refusal")
	public ResponseEntity<SuccessResponse> homeNoneMemberRegistrationRefuse(Long homeNo) {
		homeCommandService.refuseHomeNoneMemberRegistration(homeNo);
		return ResponseEntity.ok(
			SuccessResponse.builder().status(HttpStatus.OK).message("집 등록 승인이 반려되었습니다. homeNo: " + homeNo).build());
	}

	//학생 룸쉐어링 신청 승인 - 담당자
	@PutMapping("/apply-approval")
	public ResponseEntity<SuccessResponse> homeApplicationApproval(
		@RequestBody HomeApplicationRequestDto homeApplicationRequest) {
		return ResponseEntity.ok(SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("해당 학생이 승인되었습니다.")
			.result(homeCommandService.approveHomeApplication(homeApplicationRequest))
			.build());
	}

	//학생 룸쉐어링 신청 거절 - 담당자
	@DeleteMapping("/apply-refusal")
	public ResponseEntity<SuccessResponse> homeApplicationRefusal(
		@RequestBody HomeApplicationRequestDto homeApplicationRequest) {
		homeCommandService.refuseHomeApplication(homeApplicationRequest);
		return ResponseEntity.ok(SuccessResponse.builder().status(HttpStatus.OK).message("해당 학생이 거절되었습니다.").build());
	}
}
