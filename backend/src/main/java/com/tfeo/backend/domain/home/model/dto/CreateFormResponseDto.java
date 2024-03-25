package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateFormResponseDto {
	private HomeDto home;
	private ContractResponseDto contract;
	private MemberResponseDto member;
}
