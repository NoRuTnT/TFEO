package com.tfeo.backend.domain.activity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.activity.model.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
	Optional<Activity> findById(Long activityNo);
}
