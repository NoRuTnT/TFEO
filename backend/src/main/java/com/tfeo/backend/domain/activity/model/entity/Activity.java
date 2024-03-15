package com.tfeo.backend.domain.activity.model.entity;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;
import static com.tfeo.backend.common.model.type.ActivityApproveType.NONE;
import static lombok.AccessLevel.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.tfeo.backend.common.model.type.ActivityApproveType;
import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "activity")
public class Activity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long activityNo;

	private String week;

	private LocalDateTime createdAt;

	private String activityImageUrl;

	private String activityText;

	@Enumerated(value = EnumType.STRING)
	private ActivityApproveType approve;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contract_no")
	private Contract contract;

	private LocalDate startAt;

	private LocalDate expiredAt;

	public void writeActivity(String activityImageUrl, String activityText) {
		this.createdAt = LocalDateTime.now();
		this.activityImageUrl = activityImageUrl;
		this.activityText = activityText;
		this.approve = WAITING;
	}

	public void updateActivity(String activityImageUrl, String activityText) {
		this.activityImageUrl = activityImageUrl;
		this.activityText = activityText;
		this.approve = WAITING;
	}

	public void deleteActivity() {
		this.createdAt = null;
		this.activityImageUrl = null;
		this.activityText = null;
		this.approve = NONE;
	}

	public void setApprove(ActivityApproveType approve) {
		this.approve = approve;
	}

}
