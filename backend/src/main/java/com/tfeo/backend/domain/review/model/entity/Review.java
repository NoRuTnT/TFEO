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

import com.tfeo.backend.common.model.entity.BaseTimeEntity;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Review extends BaseTimeEntity {
	@Id
	@Column(name = "review_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;

	@Column(name = "home_content")
	private String homeContent;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_no")
	private Home home;

	@OneToMany(mappedBy = "review", cascade = ALL)
	private List<ReviewKeyword> reviewKeywords;

}
