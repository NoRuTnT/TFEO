package com.tfeo.backend.domain.activity.model.entity;

import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
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
	@Column(name = "activity_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long activityNo;

	private String week;

	@CreatedDate
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "activity_image_url")
	private String activityImageUrl;

	@Column(name = "activity_text")
	private String activityText;

	private ActivityApproveType approve;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contract_no")
	private Contract contract;
}
