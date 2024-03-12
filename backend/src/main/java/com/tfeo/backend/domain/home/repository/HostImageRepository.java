package com.tfeo.backend.domain.home.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HostImage;

public interface HostImageRepository extends JpaRepository<HostImage, Long> {
	List<HostImage> findAllByHome(Home home);
}
