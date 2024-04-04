package com.tfeo.backend.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeImageDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;
import com.tfeo.backend.domain.home.model.dto.HostImageDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityDto;
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
@Transactional
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

	@Transactional(readOnly = true)
	public List<FindWishListDto> findWishList(Long memberNo) {
		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		List<Wish> wishList = wishRepository.findAllByMember(member);
		List<FindWishListDto> findWishListDtoList = new ArrayList<>();
		for (Wish wish : wishList) {
			Home home = wish.getHome();
			HomeDto homeDto = new HomeDto(home);
			List<HomeImageDto> homeImageDtoList = homeImageRepository.findAllByHome(home)
				.stream()
				.map(homeImage -> new HomeImageDto(homeImage))
				.collect(Collectors.toList());
			List<HostImageDto> hostImageDtoList = hostImageRepository.findAllByHome(home)
				.stream()
				.map(hostImage -> new HostImageDto(hostImage))
				.collect(Collectors.toList());
			HostPersonalityDto hostPersonalityDto = new HostPersonalityDto(
				home.getHostPersonality());
			HomeOptionDto homeOptionDto = new HomeOptionDto(home.getHomeOption());
			FindWishListDto findWishListDto = FindWishListDto.builder()
				.homeImageList(homeImageDtoList)
				.hostImageList(hostImageDtoList)
				.home(homeDto)
				.homeOption(homeOptionDto)
				.hostPersonality(hostPersonalityDto)
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
