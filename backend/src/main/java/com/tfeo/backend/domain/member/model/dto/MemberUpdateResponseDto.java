package com.tfeo.backend.domain.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateResponseDto {
	private String profilePreSignedUrlToUpload;
	private String certificatePreSignedUrlToUpload;
}
