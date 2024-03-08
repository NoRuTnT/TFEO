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
@Table(name="home_option")
public class HomeOption {
	@Id
	@Column(name = "home_option_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeOptionNo;

	private Boolean internet;
	private Boolean kitchen;
	private Boolean washingMachine;
	private Boolean airconditioner;
	private Boolean refrigerator;
	private Boolean elevator;
	private Boolean microwave;
	private Boolean breakfast;
	private Boolean toilet;
	private Boolean heating;
}
