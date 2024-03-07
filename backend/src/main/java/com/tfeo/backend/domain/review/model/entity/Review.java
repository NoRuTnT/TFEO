package com.tfeo.backend.domain.review.model.entity;

import static javax.persistence.CascadeType.*;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HomeOption;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Review {
	@Id
	@Column(name="review_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewNo;
	@ManyToOne
	@JoinColumn(name="member_no")
	private Member member;

	@Column(name="home_content")
	private String homeContent;

	@CreatedDate
	@Column(name="created_at")
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(name="updated_at")
	private LocalDateTime updatedAt;

	@ManyToOne
	@JoinColumn(name="home_no")
	private Home home;

	@OneToMany(mappedBy = "review", cascade = ALL)
	private List<ReviewKeyword> reviewKeywords;

}
