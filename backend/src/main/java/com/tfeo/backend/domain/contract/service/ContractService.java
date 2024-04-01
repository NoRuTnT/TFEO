package com.tfeo.backend.domain.contract.service;

import java.util.List;

import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;

public interface ContractService {
	void completionContract(Long contractNo);

	String creationContractForm(Long contractNo);

	AppliedHomeResponseDto getContract(Long contractNo);

	List<ContractResponseDto> getContracts(Long memberNo);

	String signContract(Long memberNo, Long contractNo);

	void deleteContract(Long contractNo);

	String getPreSignedUrl(Long contractNo);
}