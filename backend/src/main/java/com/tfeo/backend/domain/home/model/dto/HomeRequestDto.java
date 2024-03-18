package com.tfeo.backend.domain.home.model.dto;

import lombok.Getter;

@Getter
public class HomeRequestDto {
	private HomeDto home;
	private HomeOptionDto homeOption;
	private HostPersonalityDto hostPersonality;
	//Todo: HomeImage, HostImage 고려 시 변경
}
