package com.tfeo.backend.domain.activity.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.domain.activity.service.ActivityQueryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/activity")
@RestController
public class ActivityQueryController {

	private final ActivityQueryService activityQueryService;

}
