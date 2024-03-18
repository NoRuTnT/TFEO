package com.tfeo.backend.common.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "member_personality")
public class MemberPersonality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberPersonalityNo;

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

}
