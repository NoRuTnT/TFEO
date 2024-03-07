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

import com.tfeo.backend.common.model.entity.Tag;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class HostPreference {
	@Id
	@Column(name = "host_preference_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPreferenceNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "host_no")
	private Home home;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tag_no")
	private Tag tag;

}
