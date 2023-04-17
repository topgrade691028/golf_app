package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.GolfLeaderBoard;

@Repository
public class GolfLeaderBoardRepository {
	
	private ConcurrentHashMap<Long, List<GolfLeaderBoard>> golfLeaderBoardMap = new ConcurrentHashMap<>();

	public List<GolfLeaderBoard> save(List<GolfLeaderBoard> golfLeaderBoardList) {
		golfLeaderBoardMap.put(golfLeaderBoardList.get(0).getCompetitionId(), golfLeaderBoardList);
		return golfLeaderBoardList;
	}
	
	public Optional<List<GolfLeaderBoard>> findByCompetitionId(final Long competitionId) {
		return Optional.of(golfLeaderBoardMap.get(competitionId));
	}
}
