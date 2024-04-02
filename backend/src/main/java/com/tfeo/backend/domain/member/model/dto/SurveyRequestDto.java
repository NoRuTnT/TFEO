package com.tfeo.backend.domain.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SurveyRequestDto {
	private SurveyMemberRequestDto member;
	private SurveyMemberPersonalityRequestDto memberPersonality;
}
