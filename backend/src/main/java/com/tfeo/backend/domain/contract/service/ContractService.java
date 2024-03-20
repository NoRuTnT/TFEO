package com.tfeo.backend.domain.contract.service;

public interface ContractService {
	void creationContract(Long memberNo);

	String getContractApplied(Long memberNo, Long homeNo);

	String getContractInProgress(Long memberNo, Long homeNo);

	String getContractDone(Long memberNo, Long homeNo);

}
