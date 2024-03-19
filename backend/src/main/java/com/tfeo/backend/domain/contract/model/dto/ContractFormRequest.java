package com.tfeo.backend.domain.contract.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class ContractFormRequest {
	private final Long memberNo;
	private final Long homeNo;
}
