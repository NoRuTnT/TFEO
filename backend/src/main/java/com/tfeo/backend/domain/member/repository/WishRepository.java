package com.tfeo.backend.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.model.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long> {
	Optional<Wish> findByMemberAndHome(Member member, Home home);

	List<Wish> findAllByMember(Member member);
}
