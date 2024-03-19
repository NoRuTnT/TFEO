package com.tfeo.backend.domain.review.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;

public interface ReviewQueryService {
	Page<ReadReviewResponseDto> readReviewList(Long memberNo, MemberRoleType role,
		ReadActivityRequestDto request, Pageable pageable);

	ReadReviewResponseDto readReview(Long memberNo, MemberRoleType role, Long activityNo);
