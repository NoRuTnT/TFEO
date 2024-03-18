package com.tfeo.backend.domain.activity.common;

import org.springframework.data.jpa.domain.Specification;

import com.tfeo.backend.common.model.type.ActivityApproveType;
import com.tfeo.backend.domain.activity.model.entity.Activity;

public class ActivitySpecification {
	public static Specification<Activity> equalWeek(String week){
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("week"), week);
	}

	public static Specification<Activity> equalApprove(ActivityApproveType approve){
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("approve"), approve);
	}

	public static Specification<Activity> bySgg(String sgg) {
		return (root, query, builder) -> builder.equal(root.join("contract").join("home").get("address").get("sgg"), sgg);
	}
}
