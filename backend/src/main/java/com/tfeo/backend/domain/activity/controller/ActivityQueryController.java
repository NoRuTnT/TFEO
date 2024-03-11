package com.tfeo.backend.domain.activity.controller;

import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.domain.activity.service.ActivityQueryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ActivityQueryController {

	private final ActivityQueryService activityQueryService;

}
