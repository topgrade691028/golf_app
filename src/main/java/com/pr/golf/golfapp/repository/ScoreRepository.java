package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long>{

	/**
	 * 
	 * @param eventId
	 * @return
	 */
	@Query(value = "SELECT s.*  FROM score s WHERE event_id = :eventId", 
			  nativeQuery = true)
    public Optional<List<Score>> findByEventId(@Param("eventId")Long eventId);

	/**
	 * 
	 * @param eventId
	 * @param playerId
	 * @return
	 */
	@Query(value = "SELECT s.*  FROM score s WHERE event_id = :eventId "
																+ " and player_id = :playerId ", 
			  nativeQuery = true)
	public Optional<List<Score>> findByEventIdAndPlayerId(@Param("eventId")Long eventId,
															@Param("playerId")Long playerId);
	
	/**
	 * 
	 * @param eventId  the event id 
	 * @param playerIds the list of player Ids
	 * @return
	 */
	@Query(value = "SELECT s.* FROM score s WHERE event_id = :eventId AND player_id IN :playerIds", nativeQuery = true)
	public Optional<List<Score>> findByEventIdAndPlayerIds(@Param("eventId") Long eventId, @Param("playerIds") List<Long> playerIds);

	
	/**
	 * @TODO this is to be implemented
	 * @param eventId
	 * @param playerGroupdId
	 * @return
	 */
	@Query(value = "SELECT s.* FROM score s WHERE event_id = :eventId AND player_id IN " +
	        "(SELECT player_id FROM player_grouping WHERE event_id = :eventId AND group_number = :groupNumber)",
	        nativeQuery = true)
	public Optional<List<Score>> findByEventIdAndGroupNumber(@Param("eventId") Long eventId,
	                                                        @Param("groupNumber") int groupNumber);

}
