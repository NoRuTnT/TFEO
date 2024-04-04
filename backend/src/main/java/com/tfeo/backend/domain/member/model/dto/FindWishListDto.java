package com.tfeo.backend.domain.member.model.dto;

import java.util.List;

import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeImageDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionDto;
import com.tfeo.backend.domain.home.model.dto.HostImageDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindWishListDto {
	private HomeDto home;
	private HostPersonalityDto hostPersonality;
	private HomeOptionDto homeOption;
	private List<HostImageDto> hostImageList;
	private List<HomeImageDto> homeImageList;
}
