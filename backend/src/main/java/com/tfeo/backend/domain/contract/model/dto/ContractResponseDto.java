package com.tfeo.backend.domain.contract.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class ContractResponseDto {
	Long contractNo;
	String contractUrl;
	String progress;
	LocalDate startAt;
	LocalDate expiredAt;
	Boolean studentSign;
	Boolean hostSign;

	public ContractResponseDto(Contract contract){
		this.contractNo = contract.getContractNo();
		this.contractUrl = contract.getContractUrl();
		this.progress = contract.getProgress().toString();
		this.startAt = contract.getStartAt();
		this.expiredAt = contract.getExpiredAt();
		this.studentSign = contract.getStudentSign();
		this.hostSign = contract.getHostSign();
	}
}
