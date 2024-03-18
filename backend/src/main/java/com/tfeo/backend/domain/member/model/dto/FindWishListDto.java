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
	private HomeDto homeDto;
	private HostPersonalityDto hostPersonalityDto;
	private HomeOptionDto homeOptionDto;
	private List<HostImageDto> hostImageDtoList;
	private List<HomeImageDto> homeImageDtoList;
}
