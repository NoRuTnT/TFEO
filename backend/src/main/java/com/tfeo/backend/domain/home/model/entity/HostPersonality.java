package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tfeo.backend.domain.home.model.dto.HostPersonalityDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "host_personality")
public class HostPersonality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPersonalityNo;

	private Boolean smoke;

	private Boolean pet;

	private Boolean clean;

	private Boolean daytime;

	private Boolean nighttime;

	private Boolean extrovert;

	private Boolean introvert;

	private Boolean cold;

	private Boolean hot;

	private Boolean noTouch;

	public void update(HostPersonalityDto hostPersonalityDto) {
		this.smoke = hostPersonalityDto.getSmoke();

		this.pet = hostPersonalityDto.getPet();

		this.clean = hostPersonalityDto.getClean();

		this.daytime = hostPersonalityDto.getDaytime();

		this.nighttime = hostPersonalityDto.getNighttime();

		this.extrovert = hostPersonalityDto.getExtrovert();

		this.introvert = hostPersonalityDto.getIntrovert();

		this.cold = hostPersonalityDto.getCold();

		this.hot = hostPersonalityDto.getHot();

		this.noTouch = hostPersonalityDto.getNoTouch();
	}
}
