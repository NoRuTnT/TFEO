package com.tfeo.backend.domain.contract.service;

import java.util.List;

import com.tfeo.backend.domain.contract.model.dto.ContractUrlDto;

public interface ContractService {
	void creationContract(Long memberNo, Long homeNo);
	void creationContractForm(Long memberNo, Long homeNo);

	String getContractApplied(Long memberNo, Long homeNo);

	String getContractInProgress(Long memberNo, Long homeNo);

	String getContractDone(Long memberNo, Long homeNo);

	List<ContractUrlDto> getContracts(Long memberNo);

	void signContract(Long memberNo, Long contractNo);

	void deleteContract(Long contractNo);
}