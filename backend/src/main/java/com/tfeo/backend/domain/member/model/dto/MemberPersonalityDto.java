package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.entity.MemberPersonality;

import lombok.Getter;

@Getter
public class MemberPersonalityDto {
	private final Long memberPersonalityNo;
	private final Integer daytime;
	private final Integer nighttime;
	private final Integer fast;
	private final Integer late;
	private final Integer dinner;
	private final Integer smoke;
	private final Integer drink;
	private final Integer outside;
	private final Integer inside;
	private final Integer quiet;
	private final Integer electronics;
	private final Integer strong;
	private final Integer housework;
	private final Integer errand;
	private final Integer liveLong;
	private final Integer liveShort;
	private final Integer pet;
	private final Integer cold;
	private final Integer hot;
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
