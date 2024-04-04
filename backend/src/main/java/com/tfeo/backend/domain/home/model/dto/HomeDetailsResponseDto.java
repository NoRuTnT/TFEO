package com.tfeo.backend.domain.home.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;

@Getter
public class HomeDetailsResponseDto {
	private final HomeDto home;
	private final HostPersonalityDto hostPersonality;
	private final HomeOptionDto homeOption;
	private final List<HomeImageDto> homeImageList;
	private final List<HostImageDto> hostImageList;

	public HomeDetailsResponseDto(Home home) {
		this.home = new HomeDto(home);
		this.hostPersonality = new HostPersonalityDto(home.getHostPersonality());
		this.homeOption = new HomeOptionDto(home.getHomeOption());
		this.homeImageList = home.getHomeImages().stream().map(HomeImageDto::new).collect(Collectors.toList());
		this.hostImageList = home.getHostImages().stream().map(HostImageDto::new).collect(Collectors.toList());
	}
}
