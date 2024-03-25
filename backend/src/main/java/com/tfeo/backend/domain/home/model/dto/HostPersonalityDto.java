package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HostPersonality;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HostPersonalityDto {
	private Long hostPersonalityNo;
	private Boolean smoke;
	private Boolean pet;
	private Boolean clean;
	private Boolean extrovert;
	private Boolean daytime;
	private Boolean nighttime;
	private Boolean introvert;
	private Boolean cold;
	private Boolean hot;
	private Boolean noTouch;

	public HostPersonalityDto(HostPersonality hostPersonality) {
		this.hostPersonalityNo = hostPersonality.getHostPersonalityNo();
		this.smoke = hostPersonality.getSmoke();
		this.pet = hostPersonality.getPet();
		this.clean = hostPersonality.getClean();
		this.extrovert = hostPersonality.getExtrovert();
		this.daytime = hostPersonality.getDaytime();
		this.nighttime = hostPersonality.getNighttime();
		this.introvert = hostPersonality.getIntrovert();
		this.cold = hostPersonality.getCold();
		this.hot = hostPersonality.getHot();
		this.noTouch = hostPersonality.getNoTouch();
	}
}
