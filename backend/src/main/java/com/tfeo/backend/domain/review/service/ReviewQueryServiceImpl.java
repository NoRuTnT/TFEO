package com.tfeo.backend.domain.review.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;
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
	private final MemberRepository  memberRepository;
	private final ReviewRepository reviewRepository;
	private final HomeRepository homeRepository;

	@Override
	public List<ReadReviewResponseDto> readReviewList(Long memberNo, MemberRoleType role,
		Long homeNo, Pageable pageable) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo).orElseThrow(()-> new HomeNotExistException(homeNo));
		List<Review> reveiws = reviewRepository.findAllByHome(home);
		List<ReadReviewResponseDto> result = new ArrayList<>();
		ReadReviewResponseDto responseDto;
		for(Review review: reveiws){
			responseDto= ReadReviewResponseDto().builder()
				.reviewNo()
				.createdAt()
				.homeContent()
				.keywordValues()
				.build();
			result.add(responseDto);
		}
		return result;
	}

	@Override
	public ReadReviewResponseDto readReview(Long memberNo, MemberRoleType role, Long activityNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		return null;
	}
}
