package com.tfeo.backend.domain.member.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyHomeResponseDto {
	private MyHomeContractResponseDto contract;
	private MyHomeHomeResponseDto home;
}
