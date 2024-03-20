package com.tfeo.backend.domain.contract.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.contract.service.ContractService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractController {

	private final ContractService contractService;

	//계약서 승인
	@PutMapping(value = "/creation")
	public ResponseEntity<?> contractCreation(){
		Long memberNo = 1L;
		contractService.creationContract(memberNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "성공적으로 계약서가 생성되었습니다.", null));
	}

	/**
	 *  계약서 파일(신청 중) 이름 조회
	 * @return s3에 저장된 파일명
	 */
	@GetMapping("/applied/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractApplied(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileName = contractService.getContractApplied(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileName)
			.build();
			return ResponseEntity.ok(response);
	}
	/**
	 *  계약서 파일(계약 중) 이름 조회
	 * @return s3에 저장된 파일명
	 */
	@GetMapping("/in-progress/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractInProgress(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileName = contractService.getContractInProgress(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileName)
			.build();
		return ResponseEntity.ok(response);
	}
	/**
	 *  계약서 파일(계약 완료) 이름 조회
	 * @return s3에 저장된 파일명
	 */
	@GetMapping("/done/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractDone(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileName = contractService.getContractDone(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileName)
			.build();
		return ResponseEntity.ok(response);
	}



}
