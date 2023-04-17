package com.pr.golf.golfapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pr.golf.golfapp.model.Competition;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

}
