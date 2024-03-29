package com.tfeo.backend.domain.home.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tfeo.backend.common.model.type.BuildingType;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;

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

	private Integer internet;

	private Integer gas;

	private Integer washingMachine;

	private Integer airConditioner;

	private Integer refrigerator;

	private Integer elevator;

	private Integer microwave;

	private Integer breakfast;

	private Integer toilet;

	private Integer heating;

	private Integer parking;

	private Integer station;

	private Integer moveInDate;

	private Integer sink;

	@Enumerated(value = EnumType.STRING)
	private BuildingType type;

	public void update(HomeOptionDto homeOptionDto) {
		this.internet = homeOptionDto.getInternet();

		this.gas = homeOptionDto.getGas();

		this.washingMachine = homeOptionDto.getWashingMachine();

		this.airConditioner = homeOptionDto.getAirConditioner();

		this.refrigerator = homeOptionDto.getRefrigerator();

		this.elevator = homeOptionDto.getElevator();

		this.microwave = homeOptionDto.getMicrowave();

		this.breakfast = homeOptionDto.getBreakfast();

		this.toilet = homeOptionDto.getToilet();

		this.heating = homeOptionDto.getHeating();

		this.parking = homeOptionDto.getParking();

		this.station = homeOptionDto.getStation();

		this.moveInDate = homeOptionDto.getMoveInDate();

		this.sink = homeOptionDto.getSink();

		this.type = homeOptionDto.getType();
	}
}
