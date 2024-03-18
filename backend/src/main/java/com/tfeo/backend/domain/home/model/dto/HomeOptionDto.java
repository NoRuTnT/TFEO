package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.common.model.type.BuildingType;
import com.tfeo.backend.domain.home.model.entity.HomeOption;

import lombok.Getter;

@Getter
public class HomeOptionDto {
	private Long homeOptionNo;
	private Boolean internet;
	private Boolean gas;
	private Boolean airConditioner;
	private Boolean washingMachine;
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

	public HomeOptionDto(HomeOption homeOption) {
		this.homeOptionNo = homeOption.getHomeOptionNo();
		this.internet = homeOption.getInternet();
		this.gas = homeOption.getGas();
		this.airConditioner = homeOption.getAirConditioner();
		this.washingMachine = homeOption.getWashingMachine();
		this.refrigerator = homeOption.getRefrigerator();
		this.elevator = homeOption.getElevator();
		this.microwave = homeOption.getMicrowave();
		this.breakfast = homeOption.getBreakfast();
		this.toilet = homeOption.getToilet();
		this.heating = homeOption.getHeating();
		this.parking = homeOption.getParking();
		this.station = homeOption.getStation();
		this.moveInDate = homeOption.getMoveInDate();
		this.sink = homeOption.getSink();
		this.type = homeOption.getType();
	}
}
