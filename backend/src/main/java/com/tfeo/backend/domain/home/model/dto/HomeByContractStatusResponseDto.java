package com.tfeo.backend.domain.home.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.Data;

@Data
public class HomeByContractStatusResponseDto {
	private Long contractNo;
	private String hostName;
	private String memberName;
	private Address address;
	private LocalDate startAt;
	private LocalDate expiredAt;

	public HomeByContractStatusResponseDto(Contract contract) {
		this.contractNo = contract.getContractNo();
		this.hostName = contract.getHome().getHostName();
		this.memberName = contract.getMember().getName();
		this.address = contract.getHome().getAddress();
		this.startAt = contract.getStartAt();
		this.expiredAt = contract.getExpiredAt();
	}
}
