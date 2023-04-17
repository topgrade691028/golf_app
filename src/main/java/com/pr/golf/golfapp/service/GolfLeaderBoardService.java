package com.pr.golf.golfapp.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.model.GolfLeaderBoard;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.repository.GolfLeaderBoardRepository;

@Component
public class GolfLeaderBoardService {

    private GolfLeaderBoardRepository golfLeaderBoardRepository;
    
    public GolfLeaderBoardService(@Autowired GolfLeaderBoardRepository golfLeaderBoardReposBoard) {
    	this.golfLeaderBoardRepository = golfLeaderBoardReposBoard;
    }

    public GolfLeaderBoard updateTable(GolfLeaderBoard golfLeaderBoard) {
        return GolfLeaderBoard.builder().build();
    }

    public List<GolfLeaderBoard> createGolfLeaderBoard(List<GolfLeaderBoard> leaderBoardList) {
        return golfLeaderBoardRepository.saveAll(leaderBoardList);
    }

    public GolfLeaderBoard update(List<Score> scores) {
        return GolfLeaderBoard.builder().build();
    }

    public Optional<GolfLeaderBoard> findById(Long id) {
        return Optional.of(GolfLeaderBoard.builder().build());
    }
    
    public Optional<List<GolfLeaderBoard>> findByCompetitionId(Long competitionId) {
       return Optional.ofNullable(golfLeaderBoardRepository.findByCompetitionId(competitionId));
    }

    public Optional<GolfLeaderBoard> findByEventId(Long eventId) {
        return Optional.of(GolfLeaderBoard.builder().build());
    }
}
