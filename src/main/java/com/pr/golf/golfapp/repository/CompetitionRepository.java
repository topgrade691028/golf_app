package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Competition;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

	 @Query(value = "SELECT * FROM competition WHERE CASE WHEN :searchType = 'competitionId' THEN id = CAST(:searchText AS UNSIGNED) WHEN :searchType = 'name' THEN name LIKE CONCAT('%', :searchText, '%') ELSE FALSE END", nativeQuery = true)
	    List<Competition> searchCompetitions(@Param("searchText") String searchText, @Param("searchType") String searchType);


}
