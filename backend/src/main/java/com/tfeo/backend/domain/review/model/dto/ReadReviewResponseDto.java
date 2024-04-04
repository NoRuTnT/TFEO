package com.tfeo.backend.domain.review.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadReviewResponseDto {
	 Long reviewNo;
	 String memberName;
	 String memberProfileUrl;
	 LocalDateTime createdAt;
	 String homeContent;
	 ReviewKeywordDto keywordValues;
}
