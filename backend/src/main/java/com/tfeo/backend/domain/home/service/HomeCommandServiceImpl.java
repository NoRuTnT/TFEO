package com.tfeo.backend.domain.home.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.service.FileService;
import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.common.exception.HomeNotRegisteredByNoneMember;
import com.tfeo.backend.domain.home.common.exception.HomeOptionNotExistException;
import com.tfeo.backend.domain.home.common.exception.HostPersonalityNotExistException;
import com.tfeo.backend.domain.home.model.dto.CreateFormResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityDto;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HomeImage;
import com.tfeo.backend.domain.home.model.entity.HomeOption;
import com.tfeo.backend.domain.home.model.entity.HostImage;
import com.tfeo.backend.domain.home.model.entity.HostPersonality;
import com.tfeo.backend.domain.home.repository.HomeImageRepository;
import com.tfeo.backend.domain.home.repository.HomeOptionRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.home.repository.HostImageRepository;
import com.tfeo.backend.domain.home.repository.HostPersonalityRepository;
import com.tfeo.backend.domain.member.common.exception.ApplicationNotExistException;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
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
	private final HostImageRepository hostImageRepository;
	private final HomeImageRepository homeImageRepository;
	private final FileService fileService;

	@Override
	public HomeResponseDto addHome(HomeRequestDto homeRequestDto) {
		HomeDto homeDto = homeRequestDto.getHome();
		HostPersonalityDto hostPersonalityDto = homeRequestDto.getHostPersonality();
		HomeOptionDto homeOptionDto = homeRequestDto.getHomeOption();
		List<String> homeImageList = homeRequestDto.getHomeImageUrlList();
		List<String> hostImageList = homeRequestDto.getHostImageUrlList();
		//hostPersonality
		HostPersonality hostPersonality = buildHostPersonality(hostPersonalityDto);
		Long hostPersonalityNo = hostPersonalityRepository.save(hostPersonality).getHostPersonalityNo();
		HostPersonality createdHostPersonality = hostPersonalityRepository.findById(hostPersonalityNo)
			.orElseThrow(() -> new HostPersonalityNotExistException(hostPersonalityNo));
		// homeOption
		HomeOption homeOption = buildHomeOption(homeOptionDto);
		Long homeOptionNo = homeOptionRepository.save(homeOption).getHomeOptionNo();
		HomeOption createdHomeOption = homeOptionRepository.findById(homeOptionNo)
			.orElseThrow(() -> new HomeOptionNotExistException(homeOptionNo));
		//home
		Home home = buildHome(homeDto, homeOption, hostPersonality, Role.MANAGER);
		homeRepository.save(home);
		//host image
		List<String> hostImagePresignedUrlList = new ArrayList<>();
		for (int i = 0; i < hostImageList.size(); i++) {
			String filePath = fileService.createPath("host");
			hostImagePresignedUrlList.add(fileService.createPresignedUrlToUpload(filePath));
			HostImage hostImage = HostImage.builder().hostImageUrl(filePath).home(home).build();
			hostImageRepository.save(hostImage);
		}
		//home image
		List<String> homeImageUrlList = new ArrayList<>();
		List<String> homeImagePresignedUrlList = new ArrayList<>();
		for (int i = 0; i < homeImageList.size(); i++) {
			String filePath = fileService.createPath("home");
			homeImageUrlList.add(filePath);
			homeImagePresignedUrlList.add(fileService.createPresignedUrlToUpload(filePath));
			HomeImage homeImage = HomeImage.builder().homeImageUrl(filePath).home(home).build();
			homeImageRepository.save(homeImage);
		}
		HomeResponseDto homeResponseDto = new HomeResponseDto(homeImagePresignedUrlList, homeImagePresignedUrlList);
		return homeResponseDto;
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
		Home home = buildHome(homeDto, createdHomeOption, createdHostPersonality, Role.UNAUTHORIZED_MEMBER);
		homeRepository.save(home);
	}

	@Override
	public HomeResponseDto modifyHome(Long homeNo, HomeRequestDto homeRequestDto) {
		HomeDto homeDto = homeRequestDto.getHome();
		HostPersonalityDto hostPersonalityDto = homeRequestDto.getHostPersonality();
		HomeOptionDto homeOptionDto = homeRequestDto.getHomeOption();
		List<String> hostImageUrlList = homeRequestDto.getHostImageUrlList();
		List<String> homeImageUrlList = homeRequestDto.getHomeImageUrlList();
		//host
		HostPersonality hostPersonality = hostPersonalityRepository.findById(hostPersonalityDto.getHostPersonalityNo())
			.orElseThrow(() -> new HostPersonalityNotExistException(hostPersonalityDto.getHostPersonalityNo()));
		//homeOption
		HomeOption homeOption = homeOptionRepository.findById(homeOptionDto.getHomeOptionNo())
			.orElseThrow(() -> new HomeOptionNotExistException(homeOptionDto.getHomeOptionNo()));
		//home
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		hostPersonality.update(hostPersonalityDto);
		homeOption.update(homeOptionDto);
		home.update(homeDto, homeOption, hostPersonality);
		//hostImage update
		List<String> hostImagePreSignedUrlList = updateHostImage(home, hostImageUrlList);
		//homeImage
		List<String> homeImagePreSignedUrlList = updateHomeImage(home, homeImageUrlList);
		return new HomeResponseDto(homeImagePreSignedUrlList, hostImagePreSignedUrlList);
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
		if (!home.getRegisterMemberRole().equals(Role.UNAUTHORIZED_MEMBER))
			throw new HomeNotRegisteredByNoneMember(homeNo);
		home.setRegisterMemberRole(Role.MANAGER);
		homeRepository.save(home);
	}

	@Override
	public void refuseHomeNoneMemberRegistration(Long homeNo) {
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		if (!home.getRegisterMemberRole().equals(Role.UNAUTHORIZED_MEMBER))
			throw new HomeNotRegisteredByNoneMember(homeNo);
		homeRepository.delete(home);
	}

	@Override
	public CreateFormResponseDto approveHomeApplication(HomeApplicationRequestDto homeApplicationRequest) {
		Member member = memberRepository.findById(homeApplicationRequest.getMemberNo())
			.orElseThrow(() -> new MemberNotExistException(homeApplicationRequest.getMemberNo()));
		Home home = homeRepository.findById(homeApplicationRequest.getHomeNo())
			.orElseThrow(() -> new HomeNotExistException(homeApplicationRequest.getHomeNo()));
		Contract contract = contractRepository.findByHomeAndMember(home, member)
			.orElseThrow(() -> new ApplicationNotExistException(homeApplicationRequest.getHomeNo(),
				homeApplicationRequest.getMemberNo()));
		contract.setProgress(ContractProgressType.IN_PROGRESS);
		ContractResponseDto contractResponseDto = new ContractResponseDto(contract);
		HomeDto homeDto = new HomeDto(home);
		MemberResponseDto memberResponseDto = new MemberResponseDto(member);
		contractRepository.save(contract);
		return new CreateFormResponseDto(homeDto, contractResponseDto, memberResponseDto);
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

	private List<String> updateHostImage(Home home, List<String> hostImageUrlList) {
		List<String> hostImagePreSignedUrlList = new ArrayList<>();
		Set<String> hostImageUrlSet =
			hostImageRepository.findAllByHome(home)
				.stream()
				.map(HostImage::getHostImageUrl)
				.collect(
					Collectors.toSet());
		for (String hostImageUrl : hostImageUrlList) {
			// 1. 기존에 이미 올라가 있는 경우: preSignedUrl 발급 필요 없다
			if (hostImageUrlSet.contains(hostImageUrl)) {
				hostImagePreSignedUrlList.add(null);
				hostImageUrlSet.remove(hostImageUrl);
				continue;
			}
			// 2. 기존에 없던 파일인 경우: preSignedUrl 발급 & 신규 저장
			String filePath = fileService.createPath("host");
			hostImagePreSignedUrlList.add(fileService.createPresignedUrlToUpload(filePath));
			HostImage hostImage = HostImage.builder().hostImageUrl(filePath).home(home).build();
			hostImageRepository.save(hostImage);
		}
		//3. hostImageUrlSet에 남은 것: 삭제
		List<HostImage> hostImageListToDelete = hostImageRepository.findAllByHostImageUrlIn(hostImageUrlSet);
		hostImageRepository.deleteAll(hostImageListToDelete);
		return hostImagePreSignedUrlList;
	}

	private List<String> updateHomeImage(Home home, List<String> homeImageUrlList) {
		List<String> homeImagePreSignedUrlList = new ArrayList<>();
		Set<String> homeImageUrlSet =
			homeImageRepository.findAllByHome(home)
				.stream()
				.map(HomeImage::getHomeImageUrl)
				.collect(
					Collectors.toSet());
		for (String homeImageUrl : homeImageUrlList) {
			// 1. 기존에 이미 올라가 있는 경우: preSignedUrl 발급 필요 없다
			if (homeImageUrlSet.contains(homeImageUrl)) {
				homeImagePreSignedUrlList.add(null);
				homeImageUrlSet.remove(homeImageUrl);
				continue;
			}
			// 2. 기존에 없던 파일인 경우: preSignedUrl 발급 & 신규 저장
			String filePath = fileService.createPath("home");
			homeImagePreSignedUrlList.add(fileService.createPresignedUrlToUpload(filePath));
			HomeImage homeImage = HomeImage.builder().homeImageUrl(filePath).home(home).build();
			homeImageRepository.save(homeImage);
		}
		//3. hostImageUrlSet에 남은 것: 삭제
		List<HomeImage> homeImageListToDelete = homeImageRepository.findAllByHomeImageUrlIn(homeImageUrlSet);
		homeImageRepository.deleteAll(homeImageListToDelete);
		return homeImagePreSignedUrlList;
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
		Role role) {
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
			.registerMemberRole(role)
			.homeOption(homeOption)
			.hostPersonality(hostPersonality)
			.build();
	}
}
