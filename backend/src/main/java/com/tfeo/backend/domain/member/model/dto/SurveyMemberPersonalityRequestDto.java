package com.tfeo.backend.domain.member.model.dto;

import lombok.Getter;

@Getter
public class SurveyMemberPersonalityRequestDto {
	private Boolean daytime;
	private Boolean nighttime;
	private Boolean fast;
	private Boolean late;
	private Boolean dinner;
	private Boolean smoke;
	private Boolean drink;
	private Boolean outside;
	private Boolean inside;
	private Boolean quiet;
	private Boolean electronics;
	private Boolean strong;
	private Boolean housework;
	private Boolean errand;
	private Boolean liveLong;
	private Boolean liveShort;
	private Boolean pet;
	private Boolean cold;
	private Boolean hot;
	private Integer hostHousePrefer;
}
