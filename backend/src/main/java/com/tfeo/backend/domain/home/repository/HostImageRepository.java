package com.tfeo.backend.domain.home.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HostImage;

public interface HostImageRepository extends JpaRepository<HostImage, Long> {
	List<HostImage> findAllByHome(Home home);

	List<HostImage> findAllByHostImageUrlIn(Set<String> hostImageUrlSet);
}
