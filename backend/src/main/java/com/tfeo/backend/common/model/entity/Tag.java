package com.tfeo.backend.common.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.tfeo.backend.domain.home.model.entity.HostPreference;
import com.tfeo.backend.domain.member.model.entity.MemberTag;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Tag {
	@Id
	@Column(name = "tag_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagNo;
	private String keyword;

	@OneToMany(mappedBy = "tag", cascade = ALL)
	private List<MemberTag> memberTags;

	@OneToMany(mappedBy = "tag", cascade = ALL)
	private List<HostPreference> hostPreferences;

}
