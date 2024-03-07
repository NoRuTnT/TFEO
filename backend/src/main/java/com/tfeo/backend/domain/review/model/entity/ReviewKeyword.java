package com.tfeo.backend.domain.review.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ReviewKeyword {
	@Id
	@Column(name = "review_keyword_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewKeywordNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "keyword_no")
	private Keyword keyword;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "review_no")
	private Review review;
}
