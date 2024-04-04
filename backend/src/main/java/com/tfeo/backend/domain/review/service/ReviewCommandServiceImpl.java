package com.tfeo.backend.domain.review.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.activity.common.exception.AccessDeniedException;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.review.common.exception.ReviewNotExistException;
import com.tfeo.backend.domain.review.model.dto.AddReviewRequestDto;
import com.tfeo.backend.domain.review.model.dto.AddReviewResponseDto;
import com.tfeo.backend.domain.review.model.dto.ModifyReviewRequestDto;
import com.tfeo.backend.domain.review.model.dto.ReviewKeywordDto;
import com.tfeo.backend.domain.review.model.entity.Review;
import com.tfeo.backend.domain.review.model.entity.ReviewKeyword;
import com.tfeo.backend.domain.review.repository.ReviewKeywordRepository;
import com.tfeo.backend.domain.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReviewCommandServiceImpl implements ReviewCommandService {

	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final ContractRepository contractRepository;
	private final ReviewRepository reviewRepository;
	private final ReviewKeywordRepository reviewKeywordRepository;

	@Override
	public AddReviewResponseDto addReview(Long memberNo, Role role, AddReviewRequestDto request) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(request.getHomeNo())
			.orElseThrow(() -> new HomeNotExistException(request.getHomeNo()));
		Contract contract = contractRepository.findByHomeAndMemberAndProgress(home, member, ContractProgressType.DONE)
			.orElseThrow(() -> new AccessDeniedException(memberNo));

		ReviewKeyword keyword = ReviewKeyword.builder()
			.kindElderly(request.getKeywordValues().isKindElderly())
			.cleanHouse(request.getKeywordValues().isCleanHouse())
			.spaciousRoom(request.getKeywordValues().isSpaciousRoom())
			.manyNearbyAmenities(request.getKeywordValues().isManyNearbyAmenities())
			.matchesStatedOptions(request.getKeywordValues().isMatchesStatedOptions())
			.affordableRent(request.getKeywordValues().isAffordableRent())
			.nearSchool(request.getKeywordValues().isNearSchool())
			.convenientTransportation(request.getKeywordValues().isConvenientTransportation())
			.easyAccessToHome(request.getKeywordValues().isEasyAccessToHome())
			.goodSecurity(request.getKeywordValues().isGoodSecurity())
			.respectfulElderly(request.getKeywordValues().isRespectfulElderly())
			.build();

		reviewKeywordRepository.save(keyword);

		Review review = Review.builder()
			.member(member)
			.reviewKeyword(keyword)
			.homeContent(request.getHomeContent())
			.home(home)
			.reviewKeyword(keyword)
			.build();

		reviewRepository.save(review);

		AddReviewResponseDto result = AddReviewResponseDto.builder()
			.reviewNo(review.getReviewNo())
			.memberName(member.getName())
			.createdAt(review.getCreatedAt())
			.homeContent(request.getHomeContent())
			.homeNo(home.getHomeNo())
			.keywordValues(request.getKeywordValues())
			.build();

		return result;
	}

	@Override
	public Long modifyReview(Long memberNo, Role role, Long reviewNo, ModifyReviewRequestDto request) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Review review = reviewRepository.findById(reviewNo)
			.orElseThrow(() -> new ReviewNotExistException(reviewNo));
		Contract contract = contractRepository.findByHomeAndMemberAndProgress(review.getHome(), member,
				ContractProgressType.DONE)
			.orElseThrow(() -> new AccessDeniedException(memberNo));

		review.updateReview(request.getHomeContent());

		ReviewKeyword keyword = review.getReviewKeyword();

		ReviewKeywordDto keywordValues = ReviewKeywordDto.builder()
			.kindElderly(request.getKeywordValues().isKindElderly())
			.cleanHouse(request.getKeywordValues().isCleanHouse())
			.spaciousRoom(request.getKeywordValues().isSpaciousRoom())
			.manyNearbyAmenities(request.getKeywordValues().isManyNearbyAmenities())
			.matchesStatedOptions(request.getKeywordValues().isMatchesStatedOptions())
			.affordableRent(request.getKeywordValues().isAffordableRent())
			.nearSchool(request.getKeywordValues().isNearSchool())
			.convenientTransportation(request.getKeywordValues().isConvenientTransportation())
			.easyAccessToHome(request.getKeywordValues().isEasyAccessToHome())
			.goodSecurity(request.getKeywordValues().isGoodSecurity())
			.respectfulElderly(request.getKeywordValues().isRespectfulElderly())
			.build();

		keyword.setAllKeywordValues(keywordValues);

		return reviewNo;
	}

	@Override
	public void removeReview(Long memberNo, Role role, Long reviewNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Review review = reviewRepository.findById(reviewNo)
			.orElseThrow(() -> new ReviewNotExistException(reviewNo));
		Contract contract = contractRepository.findByHomeAndMemberAndProgress(review.getHome(), member,
				ContractProgressType.DONE)
			.orElseThrow(() -> new AccessDeniedException(memberNo));

		reviewRepository.delete(review);
	}
}
