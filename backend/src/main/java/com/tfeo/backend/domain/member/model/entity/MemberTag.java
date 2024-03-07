package com.tfeo.backend.domain.member.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tfeo.backend.domain.common.model.entity.Tag;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MemberTag {
	@Id
	@Column(name="member_tag_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberTagNo;

	@ManyToOne
	@JoinColumn(name="member_no")
	private Member member;
	@ManyToOne
	@JoinColumn(name="tag_no")
	private Tag tag;
}
