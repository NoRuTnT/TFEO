package com.tfeo.backend.domain.activity.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tfeo.backend.domain.activity.model.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long>, JpaSpecificationExecutor<Activity> {
	Optional<Activity> findById(Long activityNo);

	@Query("select a from Activity a where a.contract.contractNo = :contractNo")
	List<Activity> findByContractNo(@Param("contractNo") Long contractNo);

}
