package com.tfeo.backend.domain.review.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadReviewResponseDto {
	private Long reviewNo;
	private String memberName;
	private LocalDateTime createdAt;
	private String homeContent;
	private Map<String, Boolean> keywordValues;
}
