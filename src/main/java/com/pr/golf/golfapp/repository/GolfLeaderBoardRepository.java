package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.GolfLeaderBoard;

@Repository
public interface GolfLeaderBoardRepository extends JpaRepository<GolfLeaderBoard, Long> { 
	
	/*
	 * public List<GolfLeaderBoard> save(List<GolfLeaderBoard> golfLeaderBoardList)
	 * { golfLeaderBoardMap.put(golfLeaderBoardList.get(0).getCompetitionId(),
	 * golfLeaderBoardList); return golfLeaderBoardList; }
	 * 
	 * public Optional<List<GolfLeaderBoard>> findByCompetitionId(final Long
	 * competitionId) { return Optional.of(golfLeaderBoardMap.get(competitionId)); }
	 */
	
	@Query(value = "SELECT glb.*  FROM golf_leader_board glb WHERE competition_id = :competitionId", 
			  nativeQuery = true)
	List<GolfLeaderBoard> findByCompetitionId(@Param("competitionId") Long competitionId);
}
