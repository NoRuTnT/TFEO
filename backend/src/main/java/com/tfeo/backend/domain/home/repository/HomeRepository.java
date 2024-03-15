package com.tfeo.backend.domain.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;

public interface HomeRepository extends JpaRepository<Home, Long> {
}
