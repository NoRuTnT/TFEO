package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HomeOption;

import lombok.Getter;

@Getter
public class HomeOptionResponseDto {
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

	private Boolean parking;

	private Boolean station;

	private Boolean moveInDate;

	public HomeOptionResponseDto(HomeOption homeOption) {
		this.homeOptionNo = homeOption.getHomeOptionNo();
		this.internet = homeOption.getInternet();
		this.kitchen = homeOption.getKitchen();
		this.washingMachine = homeOption.getWashingMachine();
		this.airconditioner = homeOption.getAirconditioner();
		this.refrigerator = homeOption.getRefrigerator();
		this.elevator = homeOption.getElevator();
		this.microwave = homeOption.getMicrowave();
		this.breakfast = homeOption.getBreakfast();
		this.toilet = homeOption.getToilet();
		this.heating = homeOption.getHeating();
		this.parking = homeOption.getParking();
		this.station = homeOption.getStation();
		this.moveInDate = homeOption.getMoveInDate();
	}

}
