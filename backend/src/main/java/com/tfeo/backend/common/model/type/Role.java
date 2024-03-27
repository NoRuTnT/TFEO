package com.tfeo.backend.common.model.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
	USER("ROLE_USER"),
	UNAUTHORIZED_MEMBER("ROLE_UNAUTHORIZED_MEMBER"),
	MANAGER("ROLE_MANAGER");

	private final String key;
}




