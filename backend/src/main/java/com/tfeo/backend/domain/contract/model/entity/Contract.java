package com.tfeo.backend.domain.contract.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "contract")
public class Contract {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contractNo;

	private String contractUrl;

	@CreatedDate
	private LocalDateTime createdAt;

	private ContractProgressType progress;

	private LocalDateTime startAt;

	private LocalDateTime expiredAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_no")
	private Home home;

	@OneToMany(mappedBy = "contract", cascade = ALL)
	private List<Activity> activities;

}
