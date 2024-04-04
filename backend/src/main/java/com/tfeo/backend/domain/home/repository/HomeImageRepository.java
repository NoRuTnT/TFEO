package com.tfeo.backend.domain.home.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HomeImage;

public interface HomeImageRepository extends JpaRepository<HomeImage, Long> {
	List<HomeImage> findAllByHome(Home home);

	List<HomeImage> findAllByHomeImageUrlIn(Set<String> homeImageUrlSet);

}
