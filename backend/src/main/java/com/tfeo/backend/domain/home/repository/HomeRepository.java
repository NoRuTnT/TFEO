package com.tfeo.backend.domain.home.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfeo.backend.domain.home.model.entity.Home;

@Repository
public interface HomeRepository extends JpaRepository<Home, Long> {
	@Query("select h from Home h join fetch h.contracts c where c.member.memberNo = :memberNo and c.expiredAt >= NOW()")
	Optional<Home> findByMemeber(@Param("memberNo") Long memberNo);

	Optional<Home> findById(@Param("homeNo") Long homeNo);

}
