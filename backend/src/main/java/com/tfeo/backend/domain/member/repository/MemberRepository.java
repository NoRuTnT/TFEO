package com.tfeo.backend.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.domain.member.model.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	@Query(value = "SELECT m from Member m LEFT JOIN FETCH m.memberPersonality mp WHERE m.memberNo = :memberNo")
	Optional<Member> findByMemberNo(Long memberNo);

	Optional<Member> findByEmail(String Email);

	List<Member> findAllByCertificateStatusEqualsAndCertificateNotNullOrderByMemberNoDesc(
		CertificateStatusType certificateStatusType);
}
