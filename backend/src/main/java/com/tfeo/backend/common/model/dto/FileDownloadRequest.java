package com.tfeo.backend.common.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class FileDownloadRequest {
	private final String prefix;
	private final String fileName;
}
