package com.tfeo.backend.domain.member.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AppliedHomeResponseDto {
	private AppliedHomeHomeResponseDto appliedHomeHomeResponseDto;
	private AppliedHomeContractResponseDto appliedHomeContractResponseDto;
}
