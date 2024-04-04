package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeDetailsResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AppliedHomeResponseDto {
	private HomeDetailsResponseDto home;
	private ContractResponseDto contract;
	private MemberResponseDto member;
}
