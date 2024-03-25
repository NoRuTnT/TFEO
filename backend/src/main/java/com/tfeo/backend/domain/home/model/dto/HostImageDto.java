package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.domain.home.model.entity.HostImage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HostImageDto {
	private Long hostImageNo;
	private String hostImageUrl;

	public HostImageDto(HostImage hostImage) {
		this.hostImageNo = hostImage.getHostImageNo();
		this.hostImageUrl = hostImage.getHostImageUrl();
	}
}
