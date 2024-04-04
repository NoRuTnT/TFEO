package com.tfeo.backend.domain.review.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.tfeo.backend.common.model.entity.BaseTimeEntity;
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
@Table(name = "review")
public class Review extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;

	private String homeContent;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_no")
	private Home home;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="review_keyword_no")
	private ReviewKeyword reviewKeyword;

	public void updateReview(String homeContent) {
		this.homeContent = homeContent;
	}

}
