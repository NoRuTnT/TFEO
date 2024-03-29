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
	private Integer smoke;
	private Integer pet;
	private Integer clean;
	private Integer extrovert;
	private Integer daytime;
	private Integer nighttime;
	private Integer introvert;
	private Integer cold;
	private Integer hot;
	private Integer noTouch;

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
