package com.tfeo.backend.domain.home.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.dto.HomeByContractStatusResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeDetailsResponseDto;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HomeQueryServiceImpl implements HomeQueryService {
	private final HomeRepository homeRepository;
	private final ContractRepository contractRepository;

	@Override
	public void findHomeList() {

	}

	@Override
	public HomeDetailsResponseDto findHomeDetails(Long homeNo) {
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		return new HomeDetailsResponseDto(home);
	}

	@Override
	public void findHomeNoneMemberList() {
		//Todo: 최후순위 개발
	}

	@Override
	public List<HomeByContractStatusResponseDto> findHomeInProgressList() {
		return contractRepository.findAllByProgress(ContractProgressType.IN_PROGRESS)
			.stream()
			.map(contract -> new HomeByContractStatusResponseDto(contract))
			.collect(Collectors.toList());
	}

	@Override
	public List<HomeByContractStatusResponseDto> findHomeCompletionList() {
		return contractRepository.findAllByProgress(ContractProgressType.DONE)
			.stream()
			.map(contract -> new HomeByContractStatusResponseDto(contract))
			.collect(Collectors.toList());
	}

	@Override
	public List<HomeByContractStatusResponseDto> findHomeAppliedList() {
		return contractRepository.findAllByProgress(ContractProgressType.APPLIED)
			.stream()
			.map(contract -> new HomeByContractStatusResponseDto(contract))
			.collect(Collectors.toList());
	}

	@Override
	public List<MemberResponseDto> findHomeAppliedMemberList(Long homeNo) {
		return contractRepository.findByHomeNo(homeNo)
			.stream()
			.map(contract -> new MemberResponseDto(contract.getMember()))
			.collect(Collectors.toList());
	}
}
