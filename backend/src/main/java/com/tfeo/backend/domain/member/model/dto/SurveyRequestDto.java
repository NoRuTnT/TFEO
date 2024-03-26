package com.tfeo.backend.domain.member.model.dto;

import lombok.Getter;

@Getter
public class SurveyRequestDto {
	private SurveyMemberRequestDto member;
	private SurveyMemberPersonalityRequestDto memberPersonality;
}
