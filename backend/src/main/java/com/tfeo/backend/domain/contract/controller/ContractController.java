package com.tfeo.backend.domain.contract.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.contract.service.ContractService;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractController {

	private final ContractService contractService;
	private final AuthenticationService authenticationService;

	// 계약서 폼 생성
	@GetMapping("/creation-form/{contractNo}")
	public ResponseEntity<?> contractFormCreation(
		@PathVariable Long contractNo, HttpServletRequest request) {
		String contractUrl = contractService.creationContractForm(contractNo);
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
		@PathVariable Long contractNo) {
		contractService.completionContract(contractNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "성공적으로 계약서가 생성되었습니다.", null));
	}

	// 계약서 상세 조회
	@GetMapping("/detail/{contractNo}")
	public ResponseEntity<SuccessResponse> getContract(
		@PathVariable Long contractNo) {
		AppliedHomeResponseDto contract = contractService.getContract(contractNo);
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("성공적으로 계약서가 조회되었습니다.")
			.result(contract)
			.build();
		return ResponseEntity.ok(response);
	}
	// 계약서 pre signed url 받아오기

	@GetMapping("/contract-url/{contractNo}")
	public ResponseEntity<SuccessResponse> getContractPreSignedUrl(@PathVariable Long contractNo) {
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("계약서 조회용 presignedurl이 발급되었습니다.")
			.result(contractService.getPreSignedUrl(contractNo))
			.build();
		return ResponseEntity.ok(response);
	}

	// 계약서 목록 조회 (학생)
	@GetMapping
	public ResponseEntity<?> getContracts(HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
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
	public ResponseEntity<?> signContract(@PathVariable Long contractNo, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
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
		@PathVariable Long contractNo) {
		contractService.deleteContract(contractNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("계악서가 삭제되었습니다.")
			.result(null)
			.build();
		return ResponseEntity.ok(successResponse);
	}
}
