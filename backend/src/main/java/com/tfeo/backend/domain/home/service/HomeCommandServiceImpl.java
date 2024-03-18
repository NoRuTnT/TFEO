package com.tfeo.backend.domain.home.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.common.exception.HomeNotRegisteredByNoneMember;
import com.tfeo.backend.domain.home.common.exception.HomeOptionNotExistException;
import com.tfeo.backend.domain.home.common.exception.HostPersonalityNotExistException;
import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityDto;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HomeOption;
import com.tfeo.backend.domain.home.model.entity.HostPersonality;
import com.tfeo.backend.domain.home.repository.HomeOptionRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.home.repository.HostPersonalityRepository;
import com.tfeo.backend.domain.member.common.exception.ApplicationNotExistException;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HomeCommandServiceImpl implements HomeCommandService {
	private final ContractRepository contractRepository;
	private final HomeRepository homeRepository;
	private final MemberRepository memberRepository;
	private final HostPersonalityRepository hostPersonalityRepository;
	private final HomeOptionRepository homeOptionRepository;

	@Override
	public void addHome(HomeRequestDto homeRequestDto) {
		HomeDto homeDto = homeRequestDto.getHome();
		HostPersonalityDto hostPersonalityDto = homeRequestDto.getHostPersonality();
		HomeOptionDto homeOptionDto = homeRequestDto.getHomeOption();
		HostPersonality hostPersonality = buildHostPersonality(hostPersonalityDto);
		Long hostPersonalityNo = hostPersonalityRepository.save(hostPersonality).getHostPersonalityNo();
		HostPersonality createdHostPersonality = hostPersonalityRepository.findById(hostPersonalityNo)
			.orElseThrow(() -> new HostPersonalityNotExistException(hostPersonalityNo));
		HomeOption homeOption = buildHomeOption(homeOptionDto);
		Long homeOptionNo = homeOptionRepository.save(homeOption).getHomeOptionNo();
		HomeOption createdHomeOption = homeOptionRepository.findById(homeOptionNo)
			.orElseThrow(() -> new HomeOptionNotExistException(homeOptionNo));
		Home home = buildHome(homeDto, homeOption, hostPersonality, MemberRoleType.MANAGER);
		homeRepository.save(home);
	}

	@Override
	public void addHomeAppliedByNoneMember(HomeDto homeDto) {
		HostPersonality hostPersonality = HostPersonality.builder().build();
		Long hostPersonalityNo = hostPersonalityRepository.save(hostPersonality).getHostPersonalityNo();
		HostPersonality createdHostPersonality = hostPersonalityRepository.findById(hostPersonalityNo)
			.orElseThrow(() -> new HostPersonalityNotExistException(hostPersonalityNo));
		HomeOption homeOption = HomeOption.builder().build();
		Long homeOptionNo = homeOptionRepository.save(homeOption).getHomeOptionNo();
		HomeOption createdHomeOption = homeOptionRepository.findById(homeOptionNo)
			.orElseThrow(() -> new HomeOptionNotExistException(homeOptionNo));
		Home home = buildHome(homeDto, createdHomeOption, createdHostPersonality, MemberRoleType.UNAUTHORIZED_MEMBER);
		homeRepository.save(home);
	}

	@Override
	public void modifyHome(Long homeNo, HomeRequestDto homeRequestDto) {
		HomeDto homeDto = homeRequestDto.getHome();
		HostPersonalityDto hostPersonalityDto = homeRequestDto.getHostPersonality();
		HomeOptionDto homeOptionDto = homeRequestDto.getHomeOption();

		HostPersonality hostPersonality = hostPersonalityRepository.findById(hostPersonalityDto.getHostPersonalityNo())
			.orElseThrow(() -> new HostPersonalityNotExistException(hostPersonalityDto.getHostPersonalityNo()));
		HomeOption homeOption = homeOptionRepository.findById(homeOptionDto.getHomeOptionNo())
			.orElseThrow(() -> new HomeOptionNotExistException(homeOptionDto.getHomeOptionNo()));
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		hostPersonality.update(hostPersonalityDto);
		homeOption.update(homeOptionDto);
		home.update(homeDto, homeOption, hostPersonality);
	}

	@Override
	public void removeHome(Long homeNo) {
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		homeRepository.delete(home);
	}

	@Override
	public void approveHomeNoneMemberRegistration(Long homeNo) {
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		if (!home.getRegisterMemberRole().equals(MemberRoleType.UNAUTHORIZED_MEMBER))
			throw new HomeNotRegisteredByNoneMember(homeNo);
		home.setRegisterMemberRole(MemberRoleType.MANAGER);
		homeRepository.save(home);
	}

	@Override
	public void refuseHomeNoneMemberRegistration(Long homeNo) {
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		if (!home.getRegisterMemberRole().equals(MemberRoleType.UNAUTHORIZED_MEMBER))
			throw new HomeNotRegisteredByNoneMember(homeNo);
		homeRepository.delete(home);
	}

	@Override
	public void approveHomeApplication(HomeApplicationRequestDto homeApplicationRequest) {
		Member member = memberRepository.findById(homeApplicationRequest.getMemberNo())
			.orElseThrow(() -> new MemberNotExistException(homeApplicationRequest.getMemberNo()));
		Home home = homeRepository.findById(homeApplicationRequest.getHomeNo())
			.orElseThrow(() -> new HomeNotExistException(homeApplicationRequest.getHomeNo()));
		Contract contract = contractRepository.findByHomeAndMember(home, member)
			.orElseThrow(() -> new ApplicationNotExistException(homeApplicationRequest.getHomeNo(),
				homeApplicationRequest.getMemberNo()));
		contract.setProgress(ContractProgressType.IN_PROGRESS);
		contractRepository.save(contract);
	}

	@Override
	public void refuseHomeApplication(HomeApplicationRequestDto homeApplicationRequest) {
		Member member = memberRepository.findById(homeApplicationRequest.getMemberNo())
			.orElseThrow(() -> new MemberNotExistException(homeApplicationRequest.getMemberNo()));
		Home home = homeRepository.findById(homeApplicationRequest.getHomeNo())
			.orElseThrow(() -> new HomeNotExistException(homeApplicationRequest.getHomeNo()));
		Contract contract = contractRepository.findByHomeAndMember(home, member)
			.orElseThrow(() -> new ApplicationNotExistException(homeApplicationRequest.getHomeNo(),
				homeApplicationRequest.getMemberNo()));
		contractRepository.delete(contract);
	}

	private HomeOption buildHomeOption(HomeOptionDto homeOptionDto) {
		return HomeOption.builder()
			.gas(homeOptionDto.getGas())
			.airConditioner(homeOptionDto.getAirConditioner())
			.breakfast(homeOptionDto.getBreakfast())
			.elevator(homeOptionDto.getElevator())
			.heating(homeOptionDto.getHeating())
			.sink(homeOptionDto.getSink())
			.parking(homeOptionDto.getParking())
			.station(homeOptionDto.getStation())
			.toilet(homeOptionDto.getToilet())
			.microwave(homeOptionDto.getMicrowave())
			.moveInDate(homeOptionDto.getMoveInDate())
			.refrigerator(homeOptionDto.getRefrigerator())
			.internet(homeOptionDto.getInternet())
			.washingMachine(homeOptionDto.getWashingMachine())
			.type(homeOptionDto.getType())
			.build();
	}

	private HostPersonality buildHostPersonality(HostPersonalityDto hostPersonalityDto) {
		return HostPersonality.builder()
			.clean(hostPersonalityDto.getClean())
			.cold(hostPersonalityDto.getCold())
			.daytime(hostPersonalityDto.getDaytime())
			.pet(hostPersonalityDto.getPet())
			.hot(hostPersonalityDto.getHot())
			.smoke(hostPersonalityDto.getSmoke())
			.extrovert(hostPersonalityDto.getExtrovert())
			.introvert(hostPersonalityDto.getIntrovert())
			.noTouch(hostPersonalityDto.getNoTouch())
			.nighttime(hostPersonalityDto.getNighttime())
			.build();
	}

	private Home buildHome(HomeDto homeDto, HomeOption homeOption, HostPersonality hostPersonality,
		MemberRoleType memberRoleType) {
		//Todo: hostImage, homeImage 처리
		return Home.builder()
			.address(homeDto.getAddress())
			.guardianName(homeDto.getGuardianName())
			.guardianPhone(homeDto.getGuardianPhone())
			.hostAccountNo(homeDto.getHostAccountNo())
			.hostBank(homeDto.getHostBank())
			.hostAge(homeDto.getHostAge())
			.hostGender(homeDto.getHostGender())
			.hostName(homeDto.getHostName())
			.hostPhone(homeDto.getHostPhone())
			.hostRegisterNo(homeDto.getHostRegisterNo())
			.relation(homeDto.getRelation())
			.lng(homeDto.getLng())
			.lat(homeDto.getLat())
			.introduce(homeDto.getIntroduce())
			.rent(homeDto.getRent())
			.registerMemberRole(memberRoleType)
			.homeOption(homeOption)
			.hostPersonality(hostPersonality)
			.build();
	}
}
