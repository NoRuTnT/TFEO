package com.tfeo.backend.domain.activity.controller;

import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.domain.activity.service.ActivityCommandService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ActivityCommandController {

	private final ActivityCommandService activityCommandService;

}
