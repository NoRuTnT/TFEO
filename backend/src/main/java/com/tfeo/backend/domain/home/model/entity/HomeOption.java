package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tfeo.backend.common.model.type.BuildingType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "home_option")
public class HomeOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeOptionNo;

	private Boolean internet;

	private Boolean gas;

	private Boolean washingMachine;

	private Boolean airConditioner;

	private Boolean refrigerator;

	private Boolean elevator;

	private Boolean microwave;

	private Boolean breakfast;

	private Boolean toilet;

	private Boolean heating;

	private Boolean parking;

	private Boolean station;

	private Boolean moveInDate;

	private Boolean sink;

	private BuildingType type;
}
