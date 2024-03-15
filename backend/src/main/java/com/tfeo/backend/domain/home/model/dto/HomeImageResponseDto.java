package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HomeImage;

public class HomeImageResponseDto {
	private Long homeImageNo;
	private String homeImageUrl;

	public HomeImageResponseDto(HomeImage homeImage) {
		this.homeImageNo = homeImage.getHomeImageNo();
		this.homeImageUrl = homeImage.getHomeImageUrl();
	}
}
