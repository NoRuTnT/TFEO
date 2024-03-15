package com.tfeo.backend.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.dto.HomeImageResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;
import com.tfeo.backend.domain.home.model.dto.HostImageResponseDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityResponseDto;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeImageRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.home.repository.HostImageRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.common.exception.WishNotExistException;
import com.tfeo.backend.domain.member.model.dto.FindWishListDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.model.entity.Wish;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.member.repository.WishRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishService {
	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final HomeImageRepository homeImageRepository;
	private final HostImageRepository hostImageRepository;
	private final WishRepository wishRepository;

	public void addWish(Long memberNo, Long homeNo) {
		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		Wish wish = Wish.builder().member(member).home(home).build();
		wishRepository.save(wish);
	}

	public List<FindWishListDto> findWishList(Long memberNo) {
		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		List<Wish> wishList = wishRepository.findAllByMember(member);
		List<FindWishListDto> findWishListDtoList = new ArrayList<>();
		for (Wish wish : wishList) {
			Home home = wish.getHome();
			HomeResponseDto homeResponseDto = new HomeResponseDto(home);
			List<HomeImageResponseDto> homeImageResponseDtoList = homeImageRepository.findAllByHome(home)
				.stream()
				.map(homeImage -> new HomeImageResponseDto(homeImage))
				.collect(Collectors.toList());
			List<HostImageResponseDto> hostImageResponseDtoList = hostImageRepository.findAllByHome(home)
				.stream()
				.map(hostImage -> new HostImageResponseDto(hostImage))
				.collect(Collectors.toList());
			HostPersonalityResponseDto hostPersonalityResponseDto = new HostPersonalityResponseDto(
				home.getHostPersonality());
			HomeOptionResponseDto homeOptionResponseDto = new HomeOptionResponseDto(home.getHomeOption());
			FindWishListDto findWishListDto = FindWishListDto.builder()
				.homeImageResponseDtoList(homeImageResponseDtoList)
				.hostImageResponseDtoList(hostImageResponseDtoList)
				.homeResponseDto(homeResponseDto)
				.homeOptionResponseDto(homeOptionResponseDto)
				.hostPersonalityResponseDto(hostPersonalityResponseDto)
				.build();
			findWishListDtoList.add(findWishListDto);
		}
		return findWishListDtoList;
	}

	public void removeWish(Long memberNo, Long homeNo) {
		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		Wish wish = wishRepository.findByMemberAndHome(member, home)
			.orElseThrow(() -> new WishNotExistException(memberNo, homeNo));
		wishRepository.delete(wish);
	}
}
