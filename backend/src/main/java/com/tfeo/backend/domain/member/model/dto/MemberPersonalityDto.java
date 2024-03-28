package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.entity.MemberPersonality;

import lombok.Getter;

@Getter
public class MemberPersonalityDto {
	private final Long memberPersonalityNo;
	private final Boolean daytime;
	private final Boolean nighttime;
	private final Boolean fast;
	private final Boolean late;
	private final Boolean dinner;
	private final Boolean smoke;
	private final Boolean drink;
	private final Boolean outside;
	private final Boolean inside;
	private final Boolean quiet;
	private final Boolean electronics;
	private final Boolean strong;
	private final Boolean housework;
	private final Boolean errand;
	private final Boolean liveLong;
	private final Boolean liveShort;
	private final Boolean pet;
	private final Boolean cold;
	private final Boolean hot;
	private final Integer hostHousePrefer;

	MemberPersonalityDto(MemberPersonality memberPersonality) {
		this.memberPersonalityNo = memberPersonality.getMemberPersonalityNo();
		this.daytime = memberPersonality.getDaytime();
		this.nighttime = memberPersonality.getNighttime();
		this.fast = memberPersonality.getFast();
		this.late = memberPersonality.getLate();
		this.dinner = memberPersonality.getDinner();
		this.smoke = memberPersonality.getSmoke();
		this.drink = memberPersonality.getDrink();
		this.outside = memberPersonality.getOutside();
		this.inside = memberPersonality.getInside();
		this.quiet = memberPersonality.getQuiet();
		this.electronics = memberPersonality.getElectronics();
		this.strong = memberPersonality.getStrong();
		this.housework = memberPersonality.getHousework();
		this.errand = memberPersonality.getErrand();
		this.liveLong = memberPersonality.getLiveLong();
		this.liveShort = memberPersonality.getLiveShort();
		this.pet = memberPersonality.getPet();
		this.cold = memberPersonality.getCold();
		this.hot = memberPersonality.getHot();
		this.hostHousePrefer = memberPersonality.getHostHousePrefer();
	}
}
