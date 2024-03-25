package com.tfeo.backend.domain.review.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.review.model.entity.Review;
public interface ReviewRepository extends JpaRepository<Review, Long>  {
	Optional<Review> findById(Long reviewNo);

	List<Review> findAllByHome(Home home);
}
