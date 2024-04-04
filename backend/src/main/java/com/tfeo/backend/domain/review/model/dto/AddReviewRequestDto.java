package com.tfeo.backend.domain.review.model.dto;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

import com.tfeo.backend.domain.review.model.entity.ReviewKeyword;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddReviewRequestDto {
	String homeContent;
	Long homeNo;
	ReviewKeywordDto keywordValues;

}
