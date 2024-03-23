package com.tfeo.backend.common.controller;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class deployController {
	private final Environment env;

	@GetMapping("/status/profile")
	public String getProfileName() {
		return Arrays.stream(env.getActiveProfiles()).findFirst().orElse("");
	}
}
