package com.tfeo.backend.domain.contract.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class ContractUrlDto {
	String contractNo;
	String contractUrl;
}
