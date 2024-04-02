package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.type.GenderType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SurveyMemberRequestDto {
	private String college;
	private Double lat;
	private Double lng;
	private GenderType gender;
}
