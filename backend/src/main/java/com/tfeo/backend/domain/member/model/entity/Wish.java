package com.tfeo.backend.domain.member.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Wish {
	@Id
	@Column(name="wish_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wishNo;
	@ManyToOne
	@JoinColumn(name="member_no")
	private Member member;
	@CreatedDate
	@Column(name="created_at")
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	@ManyToOne
	@JoinColumn(name="home_no")
	private Home home;

}
