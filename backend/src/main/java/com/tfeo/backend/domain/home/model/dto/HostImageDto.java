package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HostImage;

import lombok.Getter;

@Getter
public class HostImageDto {
	private Long hostImageNo;
	private String hostImageUrl;

	public HostImageDto(HostImage hostImage) {
		this.hostImageNo = hostImage.getHostImageNo();
		this.hostImageUrl = hostImage.getHostImageUrl();
	}
}
