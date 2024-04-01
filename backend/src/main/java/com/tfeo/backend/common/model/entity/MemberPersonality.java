package com.tfeo.backend.common.model.entity;

import static lombok.AccessLevel.*;

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
@NoArgsConstructor(access = PUBLIC)
@Builder
@AllArgsConstructor
@Table(name = "member_personality")
public class MemberPersonality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberPersonalityNo;

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

	private Integer electronics;

	private Integer strong;

	private Integer housework;

	private Integer errand;

	private Integer liveLong;

	private Integer liveShort;

	private Integer pet;

	private Integer cold;

	private Integer hot;

	private Integer hostHousePrefer;

}
