package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.Getter;

@Getter
public class AppliedHomeContractResponseDto {
	private Long contractNo;
	private ContractProgressType progress;

	public AppliedHomeContractResponseDto(Contract contract) {
		this.contractNo = contract.getContractNo();
		this.progress = contract.getProgress();
	}
}
