package com.tfeo.backend.domain.review.model.entity;

import static javax.persistence.CascadeType.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Keyword {
	@Id
	@Column(name="keyword_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long keywordNo;
	@Column(name="keyword_name")
	private String keywordName;

	@OneToMany(mappedBy = "keyword", cascade = ALL)
	private List<ReviewKeyword> reviewKeywords;
}
