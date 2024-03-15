package com.tfeo.backend.domain.member.model.dto;

import java.util.List;

import com.tfeo.backend.domain.home.model.dto.HomeImageResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeOptionResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;
import com.tfeo.backend.domain.home.model.dto.HostImageResponseDto;
import com.tfeo.backend.domain.home.model.dto.HostPersonalityResponseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindWishListDto {
	private HomeResponseDto homeResponseDto;
	private HostPersonalityResponseDto hostPersonalityResponseDto;
	private HomeOptionResponseDto homeOptionResponseDto;
	private List<HostImageResponseDto> hostImageResponseDtoList;
	private List<HomeImageResponseDto> homeImageResponseDtoList;
}
