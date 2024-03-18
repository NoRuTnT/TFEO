package com.tfeo.backend.domain.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.HostPersonality;

public interface HostPersonalityRepository extends JpaRepository<HostPersonality, Long> {
}
