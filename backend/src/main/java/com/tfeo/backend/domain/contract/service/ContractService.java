package com.tfeo.backend.domain.contract.service;

import java.util.List;

import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;

public interface ContractService {
	void completionContract(Long contractNo);

	String creationContractForm(Long memberNo, Long homeNo);

	ContractResponseDto getContract(Long contractNo);

	List<ContractResponseDto> getContracts(Long memberNo);

	String signContract(Long memberNo, Long contractNo);

	void deleteContract(Long contractNo);
}