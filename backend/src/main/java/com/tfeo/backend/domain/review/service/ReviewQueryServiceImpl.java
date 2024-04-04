package com.tfeo.backend.domain.review.service;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.review.common.exception.ReviewNotExistException;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;
import com.tfeo.backend.domain.review.model.dto.ReviewKeywordDto;
import com.tfeo.backend.domain.review.model.entity.Review;
import com.tfeo.backend.domain.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReviewQueryServiceImpl implements ReviewQueryService {
	private final ReviewRepository reviewRepository;
	private final HomeRepository homeRepository;

	@Override
	public List<ReadReviewResponseDto> readReviewList(
		Long homeNo) {
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		List<Review> reviews = reviewRepository.findAllByHome(home);
		List<ReadReviewResponseDto> result = new ArrayList<>();
		for (Review review : reviews) {
			ReviewKeywordDto reviewKeywordDto = ReviewKeywordDto.builder()
				.kindElderly(review.getReviewKeyword().getKindElderly())
				.cleanHouse(review.getReviewKeyword().getCleanHouse())
				.spaciousRoom(review.getReviewKeyword().getSpaciousRoom())
				.manyNearbyAmenities(review.getReviewKeyword().getManyNearbyAmenities())
				.matchesStatedOptions(review.getReviewKeyword().getMatchesStatedOptions())
				.affordableRent(review.getReviewKeyword().getAffordableRent())
				.nearSchool(review.getReviewKeyword().getNearSchool())
				.convenientTransportation(review.getReviewKeyword().getConvenientTransportation())
				.easyAccessToHome(review.getReviewKeyword().getEasyAccessToHome())
				.goodSecurity(review.getReviewKeyword()
					.getGoodSecurity())
				.respectfulElderly(review.getReviewKeyword().getRespectfulElderly())
				.build();

			ReadReviewResponseDto responseDto = ReadReviewResponseDto.builder()
				.reviewNo(review.getReviewNo())
				.memberName(review.getMember().getName())
				.memberProfileUrl(review.getMember().getProfileUrl())
				.createdAt(review.getCreatedAt())
				.homeContent(review.getHomeContent())
				.keywordValues(reviewKeywordDto)
				.build();
			result.add(responseDto);
		}

		return result;
	}

	@Override
	public ReadReviewResponseDto readReview(Long reviewNo) {
		Review review = reviewRepository.findById(reviewNo)
			.orElseThrow(() -> new ReviewNotExistException(reviewNo));
		ReviewKeywordDto reviewKeywordDto = ReviewKeywordDto.builder()
			.kindElderly(review.getReviewKeyword().getKindElderly())
			.cleanHouse(review.getReviewKeyword().getCleanHouse())
			.spaciousRoom(review.getReviewKeyword().getSpaciousRoom())
			.manyNearbyAmenities(review.getReviewKeyword().getManyNearbyAmenities())
			.matchesStatedOptions(review.getReviewKeyword().getMatchesStatedOptions())
			.affordableRent(review.getReviewKeyword().getAffordableRent())
			.nearSchool(review.getReviewKeyword().getNearSchool())
			.convenientTransportation(review.getReviewKeyword().getConvenientTransportation())
			.easyAccessToHome(review.getReviewKeyword().getEasyAccessToHome())
			.goodSecurity(review.getReviewKeyword()
				.getGoodSecurity())
			.respectfulElderly(review.getReviewKeyword().getRespectfulElderly())
			.build();

		ReadReviewResponseDto result = ReadReviewResponseDto.builder()
			.reviewNo(review.getReviewNo())
			.memberName(review.getMember().getName())
			.memberProfileUrl(review.getMember().getProfileUrl())
			.createdAt(review.getCreatedAt())
			.homeContent(review.getHomeContent())
			.keywordValues(reviewKeywordDto)
			.build();
		return result;
	}
}
