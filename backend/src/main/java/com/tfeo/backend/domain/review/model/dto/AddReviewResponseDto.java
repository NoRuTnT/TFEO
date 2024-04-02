package com.tfeo.backend.domain.review.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AddReviewResponseDto {
	Long reviewNo;
	String memberName;
	LocalDateTime createdAt;
	String homeContent;
	Long homeNo;
	ReviewKeywordDto keywordValues;
}
