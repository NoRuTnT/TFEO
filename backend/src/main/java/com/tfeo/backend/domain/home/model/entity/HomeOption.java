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
public class HomeOption {
	@Id
	@Column(name="home_option_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeOptionNo;
	@ManyToOne
	@JoinColumn(name="option_no")
	private Option option;

	@ManyToOne
	@JoinColumn(name="home_no")
	private Home home;
}
