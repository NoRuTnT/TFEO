package com.tfeo.backend.domain.review.model.dto;

import java.util.Map;

import lombok.Data;

@Data
public class ModifyReviewRequestDto {
	 String homeContent;
	 Map<String, Boolean> keywordValues;
}
