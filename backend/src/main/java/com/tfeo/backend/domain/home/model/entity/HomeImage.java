package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "home_image")
public class HomeImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeImageNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_no")
	private Home home;

	private String homeImageUrl;
}
