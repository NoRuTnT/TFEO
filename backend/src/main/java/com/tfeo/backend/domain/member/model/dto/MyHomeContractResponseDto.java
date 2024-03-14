package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.Getter;

@Getter
public class MyHomeContractResponseDto {
	private Long contractNo;
	private String contractUrl;
	private LocalDate startAt;
	private LocalDate expiredAt;

	public MyHomeContractResponseDto(Contract contract) {
		this.contractNo = contract.getContractNo();
		this.contractUrl = contract.getContractUrl();
		this.startAt = contract.getStartAt();
		this.expiredAt = contract.getExpiredAt();
	}
}
