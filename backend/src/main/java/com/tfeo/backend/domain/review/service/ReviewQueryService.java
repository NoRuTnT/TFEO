package com.tfeo.backend.domain.review.service;

import java.util.List;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;

public interface ReviewQueryService {
	List<ReadReviewResponseDto> readReviewList(
		Long homeNo);

	ReadReviewResponseDto readReview(Long reviewNo);
}