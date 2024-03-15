package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HostImage;

import lombok.Getter;

@Getter
public class HostImageResponseDto {
	private Long hostImageNo;
	private String hostImageUrl;

	public HostImageResponseDto(HostImage hostImage) {
		this.hostImageNo = hostImage.getHostImageNo();
		this.hostImageUrl = hostImage.getHostImageUrl();
	}
}
