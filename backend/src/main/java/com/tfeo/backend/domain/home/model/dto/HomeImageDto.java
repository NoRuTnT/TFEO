package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HomeImage;

public class HomeImageDto {
	private Long homeImageNo;
	private String homeImageUrl;

	public HomeImageDto(HomeImage homeImage) {
		this.homeImageNo = homeImage.getHomeImageNo();
		this.homeImageUrl = homeImage.getHomeImageUrl();
	}
}
