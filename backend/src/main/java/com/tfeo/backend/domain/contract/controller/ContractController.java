package com.tfeo.backend.domain.contract.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.contract.model.dto.ContractUrlDto;
import com.tfeo.backend.domain.contract.model.dto.ContractsResponse;
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
		contractService.creationContractForm(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서 폼이 생성되었습니다.")
			.result(null)
			.build();
		return ResponseEntity.ok(response);

	}

	//계약서 승인
	@PutMapping(value = "/creation/{homeNo}")
	public ResponseEntity<SuccessResponse> contractCreation(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		contractService.creationContract(memberNo,homeNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "성공적으로 계약서가 생성되었습니다.", null));
	}

	// 계약서 url 조회 (신청 중)
	@GetMapping("/applied/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractApplied(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileUrl = contractService.getContractApplied(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileUrl)
			.build();
			return ResponseEntity.ok(response);
	}
	// 계약서 url 조회 (진행 중)
	@GetMapping("/in-progress/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractInProgress(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileUrl = contractService.getContractInProgress(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileUrl)
			.build();
		return ResponseEntity.ok(response);
	}
	// 계약서 url 조회 (계약 완료)
	@GetMapping("/done/{homeNo}")
	public ResponseEntity<SuccessResponse> getContractDone(
		@PathVariable Long homeNo){
		Long memberNo = 1L;
		String contractFileUrl = contractService.getContractDone(memberNo, homeNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contractFileUrl)
			.build();
		return ResponseEntity.ok(response);
	}

	// 학생이 작성한 모든 계약서 목록 조회
	@GetMapping
	public ResponseEntity<SuccessResponse> getContracts(){
		Long memberNo = 1L;
		List<ContractUrlDto> contracts = contractService.getContracts(memberNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서 목록이 조회되었습니다.")
			.result(new ContractsResponse(contracts))
			.build();
		return ResponseEntity.ok(response);
	}

	// 계약서 싸인
	@PutMapping("/sign/{contractNo}")
	public ResponseEntity<SuccessResponse> signContract(
		@PathVariable Long contractNo
	){
		Long memberNo = 1L;
		contractService.signContract(memberNo,contractNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("계약서 싸인이 완료되었습니다.")
			.result(null)
			.build();
		return ResponseEntity.ok(response);
	}

	// 계약서 삭제
	@DeleteMapping("/delete/{homeNo}")
	public ResponseEntity<SuccessResponse> deleteContract(@PathVariable Long contractNo){
		contractService.deleteContract(contractNo);
		SuccessResponse successResponse = SuccessResponse.builder()
				.status(HttpStatus.OK)
				.message("계악서가 삭제되었습니다.")
				.build();
		return ResponseEntity.ok(successResponse);
	}
}
