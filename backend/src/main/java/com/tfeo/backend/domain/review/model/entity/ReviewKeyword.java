package com.tfeo.backend.domain.review.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ReviewKeyword {
	@Id
	@Column(name="review_keyword_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewKeywordNo;
	@ManyToOne
	@JoinColumn(name="keyword_no")
	private Keyword keyword;
	@ManyToOne
	@JoinColumn(name="review_no")
	private Review review;
}
