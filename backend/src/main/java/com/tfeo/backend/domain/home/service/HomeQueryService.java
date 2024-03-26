package com.tfeo.backend.domain.home.service;

import java.util.List;

import com.tfeo.backend.domain.home.model.dto.HomeByContractStatusResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeDetailsResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;

public interface HomeQueryService {
	public void findHomeList();

	public HomeDetailsResponseDto findHomeDetails(Long homeNo);

	public void findHomeNoneMemberList();

	public List<HomeByContractStatusResponseDto> findHomeInProgressList();

	public List<HomeByContractStatusResponseDto> findHomeCompletionList();

	public List<HomeByContractStatusResponseDto> findHomeAppliedList();

	public List<MemberResponseDto> findHomeAppliedMemberList(Long homeNo);
}
