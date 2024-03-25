package com.tfeo.backend.domain.home.model.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class HomeRequestDto {
	private HomeDto home;
	private HomeOptionDto homeOption;
	private HostPersonalityDto hostPersonality;
	private List<String> homeImageUrlList; // 집 사진 url, 집 최초 등록 시에는 아무거나 들어와도 됨
	private List<String> hostImageUrlList; // 호스트 사진 url, 집 최초 등록 시에는 아무거나 들어와도 됨
}
