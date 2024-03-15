package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HostPersonality;

import lombok.Getter;

@Getter
public class HostPersonalityResponseDto {
	private Long hostPersonalityNo;
	private Boolean kind;
	private Boolean smoke;
	private Boolean pet;
	private Boolean clean;
	private Boolean extrovert;
	private Boolean sense;
	private Boolean thought;
	private Boolean judgment;
	private Boolean daytime;
	private Boolean nighttime;

	public HostPersonalityResponseDto(HostPersonality hostPersonality) {
		this.hostPersonalityNo = hostPersonality.getHostPersonalityNo();
		this.kind = hostPersonality.getKind();
		this.smoke = hostPersonality.getSmoke();
		this.pet = hostPersonality.getPet();
		this.clean = hostPersonality.getClean();
		this.extrovert = hostPersonality.getExtrovert();
		this.sense = hostPersonality.getSense();
		this.thought = hostPersonality.getThought();
		this.judgment = hostPersonality.getJudgment();
		this.daytime = hostPersonality.getDaytime();
		this.nighttime = hostPersonality.getNighttime();
	}
}
