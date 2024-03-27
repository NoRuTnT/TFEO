package com.tfeo.backend.domain.home.model.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class HomeResponseDto {
	private final List<String> homeImagePreSignedUrlList;
	private final List<String> hostImagePreSignedUrlList;

	public HomeResponseDto(List<String> homeImagePreSignedUrlList, List<String> hostImagePreSignedUrlList) {
		this.homeImagePreSignedUrlList = homeImagePreSignedUrlList;
		this.hostImagePreSignedUrlList = hostImagePreSignedUrlList;
	}
}
