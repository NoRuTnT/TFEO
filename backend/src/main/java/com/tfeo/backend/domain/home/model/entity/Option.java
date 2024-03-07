package com.tfeo.backend.domain.home.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Option {
	@Id
	@Column(name = "option_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long optionNo;

	@Column(name = "option_name")
	private String optionName;

	@OneToMany(mappedBy = "option", cascade = ALL)
	private List<HomeOption> homeOptions;

}
