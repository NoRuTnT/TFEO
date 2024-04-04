package com.tfeo.backend.domain.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SurveyMemberPersonalityRequestDto {
	private Integer daytime;
	private Integer nighttime;
	private Integer fast;
	private Integer late;
	private Integer dinner;
	private Integer smoke;
	private Integer drink;
	private Integer outside;
	private Integer inside;
	private Integer quiet;
	private Integer liveLong;
	private Integer liveShort;
	private Integer pet;
	private Integer cold;
	private Integer hot;
	private Integer hostHousePrefer;
}
