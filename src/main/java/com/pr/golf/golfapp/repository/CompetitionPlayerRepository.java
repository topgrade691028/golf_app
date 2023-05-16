package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.CompetitionPlayer;
import com.pr.golf.golfapp.model.Player;

@Repository
public interface CompetitionPlayerRepository extends JpaRepository<CompetitionPlayer, Long> {

    @Modifying
    @Query(value = "DELETE FROM competition_player WHERE competition_id = :competitionId AND player_id = :playerId", nativeQuery = true)
    void deleteByEventIdAndPlayerId(@Param("competitionId") Long competitionId, @Param("playerId") Long playerId);


    @Query(value = "SELECT p.id, p.name, p.handicap " +
            "FROM competition_player cp " +
            "JOIN player p ON cp.player_id = p.id " +
            "WHERE cp.competition_id = :competitionId", nativeQuery = true)
    List<Object[]> getRegisteredPlayersForCompetition(@Param("competitionId") Long competitionId);

}
