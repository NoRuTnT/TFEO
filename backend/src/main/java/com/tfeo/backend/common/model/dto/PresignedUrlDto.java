package com.tfeo.backend.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
public class PresignedUrlDto {
	String url;
}
