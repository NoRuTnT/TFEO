package com.tfeo.backend.domain.review.service;

import java.util.List;


import org.springframework.data.domain.Pageable;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;

public interface ReviewQueryService {
	List<ReadReviewResponseDto> readReviewList(Long memberNo, MemberRoleType role,
		Long homeNo);

	ReadReviewResponseDto readReview(Long memberNo, MemberRoleType role, Long reviewNo);
}