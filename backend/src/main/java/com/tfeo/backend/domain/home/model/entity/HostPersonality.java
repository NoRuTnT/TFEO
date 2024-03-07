package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class HostPersonality {
	@Id
	@Column(name = "host_personality_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPersonalityNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_no")
	private Home home;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "personality_no")
	private Personality personality;

}
