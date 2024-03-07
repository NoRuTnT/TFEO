package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class HomeImage {
	@Id
	@Column(name="picture_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pictureNo;
	@ManyToOne
	@JoinColumn(name="home_no")
	private Home home;
	@Column(name="picture_url")
	private String pictureUrl;
}
