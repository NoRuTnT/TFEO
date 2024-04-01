package com.tfeo.backend.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.common.model.entity.MemberPersonality;

public interface MemberPersonalityRepository extends JpaRepository<MemberPersonality, Long> {

}
