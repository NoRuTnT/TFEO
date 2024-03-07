package com.tfeo.backend.domain.home.model.entity;

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
public class Personality {
	@Id
	@Column(name="personality_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long personalityNo;
	@Column(name="personality_name")
	private String personalityName;

	@OneToMany(mappedBy = "personality", cascade = ALL)
	private List<HostPersonality> hostPersonalities;
}
