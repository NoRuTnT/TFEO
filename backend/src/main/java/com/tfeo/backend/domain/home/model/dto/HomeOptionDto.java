package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.common.model.type.BuildingType;
import com.tfeo.backend.domain.home.model.entity.HomeOption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeOptionDto {
	private Long homeOptionNo;
	private Integer internet;
	private Integer gas;
	private Integer airConditioner;
	private Integer washingMachine;
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
