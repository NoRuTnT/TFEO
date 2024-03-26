package com.tfeo.backend.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class PresignedUrlResponse {
	String url;
}
