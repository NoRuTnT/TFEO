package com.tfeo.backend.common.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.FileDownloadRequest;
import com.tfeo.backend.common.model.dto.FileUploadRequest;
import com.tfeo.backend.common.model.dto.PresignedUrlDto;
import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

	private final FileService fileService;

	@PostMapping("/upload-url")
	public ResponseEntity<SuccessResponse> getPresignedUrlToUpload (
		@RequestBody(required = false) FileUploadRequest request){
		String prefix = request.getPrefix();
		String fileName = request.getFileName();
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("파일 업로드 url 발급에 성공했습니다.")
			.result(new PresignedUrlDto(fileService.createPresignedUrlToUpload(prefix, fileName)))
			.build();
		return ResponseEntity.ok(response);
	}

	@PostMapping("/download-url")
	public ResponseEntity<SuccessResponse> getPresignedUrlToUpload (
		@RequestBody(required = false) FileDownloadRequest request){
		String prefix = request.getPrefix();
		String fileName = request.getFileName();
		PresignedUrlDto presignedUrlDto = PresignedUrlDto
			.builder()
			.url(fileService.createPresignedUrlToDownload(prefix, fileName))
			.build();
		SuccessResponse response = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("파일 다운로드 url 발급에 성공했습니다.")
			.result(presignedUrlDto)
			.build();
		return 	ResponseEntity.ok(response);
	}


}
