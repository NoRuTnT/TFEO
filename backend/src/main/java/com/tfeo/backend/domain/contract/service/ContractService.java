package com.tfeo.backend.domain.contract.service;

import java.util.List;

import com.tfeo.backend.domain.contract.model.entity.Contract;

public interface ContractService {
	void creationContract(Long memberNo, Long homeNo);

	String getContractApplied(Long memberNo, Long homeNo);

	String getContractInProgress(Long memberNo, Long homeNo);

	String getContractDone(Long memberNo, Long homeNo);

	List<Contract> getContracts(Long memberNo);
}
