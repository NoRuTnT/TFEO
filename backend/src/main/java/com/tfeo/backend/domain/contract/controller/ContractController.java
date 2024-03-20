package com.tfeo.backend.domain.contract.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.activity.service.ActivityQueryService;
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
}
