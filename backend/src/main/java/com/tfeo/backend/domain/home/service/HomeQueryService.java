package com.tfeo.backend.domain.home.service;

import java.util.List;

import com.tfeo.backend.domain.home.model.dto.HomeByContractStatusResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeDetailsResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;

public interface HomeQueryService {
	void findHomeList();

	HomeDetailsResponseDto findHomeDetails(Long homeNo);

	void findHomeNoneMemberList();

	List<HomeByContractStatusResponseDto> findHomeInProgressList();

	List<HomeByContractStatusResponseDto> findHomeCompletionList();

	List<HomeByContractStatusResponseDto> findHomeAppliedList();

	List<MemberResponseDto> findHomeAppliedMemberList(Long homeNo);
}
