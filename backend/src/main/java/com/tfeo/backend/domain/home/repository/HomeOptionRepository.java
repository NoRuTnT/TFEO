package com.tfeo.backend.domain.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.HomeOption;

public interface HomeOptionRepository extends JpaRepository<HomeOption, Long> {
}
