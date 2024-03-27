package com.tfeo.backend.domain.review.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
import com.tfeo.backend.domain.review.model.entity.Review;
import com.tfeo.backend.domain.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReviewQueryServiceImpl implements ReviewQueryService {
	private final MemberRepository memberRepository;
	private final ReviewRepository reviewRepository;
	private final HomeRepository homeRepository;

	@Override
	public List<ReadReviewResponseDto> readReviewList(Long memberNo, Role role,
		Long homeNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo).orElseThrow(() -> new HomeNotExistException(homeNo));
		List<Review> reviews = reviewRepository.findAllByHome(home);
		List<ReadReviewResponseDto> result = new ArrayList<>();
		for (Review review : reviews) {
			ReadReviewResponseDto responseDto = ReadReviewResponseDto.builder()
				.reviewNo(review.getReviewNo())
				.memberName(review.getMember().getName())
				.createdAt(review.getCreatedAt())
				.homeContent(review.getHomeContent())
				.keywordValues((Map<String, Boolean>)review.getReviewKeyword())
				.build();
		}

		return result;
	}

	@Override
	public ReadReviewResponseDto readReview(Long memberNo, Role role, Long reviewNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Review review = reviewRepository.findById(reviewNo)
			.orElseThrow(() -> new ReviewNotExistException(reviewNo));

		ReadReviewResponseDto result = ReadReviewResponseDto.builder()
			.reviewNo(review.getReviewNo())
			.memberName(review.getMember().getName())
			.createdAt(review.getCreatedAt())
			.homeContent(review.getHomeContent())
			.keywordValues((Map<String, Boolean>)review.getReviewKeyword())
			.build();
		return result;
	}
}
