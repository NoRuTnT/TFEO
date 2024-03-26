package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HomeImage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeImageDto {
	private Long homeImageNo;
	private String homeImageUrl;

	public HomeImageDto(HomeImage homeImage) {
		this.homeImageNo = homeImage.getHomeImageNo();
		this.homeImageUrl = homeImage.getHomeImageUrl();
	}
}
