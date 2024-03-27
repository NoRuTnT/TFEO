package com.tfeo.backend.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.review.model.entity.ReviewKeyword;

public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Long> {
}
