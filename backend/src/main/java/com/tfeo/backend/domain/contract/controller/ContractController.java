package com.tfeo.backend.domain.contract.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.contract.service.ContractService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractController {

	private final ContractService contractService;

	// 계약서 폼 생성
	@GetMapping("/creation-form/{homeNo}")
	public ResponseEntity<SuccessResponse> contractFormCreation(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractUrl = contractService.creationContractForm(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서 폼이 생성되었습니다.")
			.result(contractUrl)
			.build();
		return ResponseEntity.ok(response);

	}

	// 계약 완료
	@PutMapping(value = "/completion/{contractNo}")
	public ResponseEntity<SuccessResponse> contractCompletion(
		@PathVariable Long contractNo){
		contractService.completionContract(contractNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "성공적으로 계약서가 생성되었습니다.", null));
	}

	// 계약서 상세 조회
	@GetMapping("/detail/{contractNo}")
	public ResponseEntity<SuccessResponse> getContract(
		@PathVariable Long contractNo){
		ContractResponseDto contract = contractService.getContract(contractNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contract)
			.build();
			return ResponseEntity.ok(response);
	}

	// 계약서 목록 조회 (학생)
	@GetMapping
	public ResponseEntity<SuccessResponse> getContracts(){
		Long memberNo = 1L;
		List<ContractResponseDto> contracts = contractService.getContracts(memberNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서 목록이 조회되었습니다.")
			.result(contracts)
			.build();
		return ResponseEntity.ok(response);
	}

	// 계약서 싸인
	@PutMapping("/sign/{contractNo}")
	public ResponseEntity<SuccessResponse> signContract(
		@PathVariable Long contractNo){
		Long memberNo = 1L;
		String contractPresignedUrl = contractService.signContract(memberNo, contractNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("계약서 싸인이 완료되었습니다.")
			.result(contractPresignedUrl)
			.build();
		return ResponseEntity.ok(response);
	}

	// 계약서 삭제
	@DeleteMapping("/delete/{contractNo}")
	public ResponseEntity<SuccessResponse> deleteContract(
		@PathVariable Long contractNo){
		contractService.deleteContract(contractNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("계악서가 삭제되었습니다.")
			.result(null)
			.build();
		return ResponseEntity.ok(successResponse);
	}
}
