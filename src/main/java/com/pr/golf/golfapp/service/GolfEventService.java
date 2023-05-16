package com.pr.golf.golfapp.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.mapper.GolfEventMapper;
import com.pr.golf.golfapp.mapper.PlayerMapper;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.GolfEventPlayer;
import com.pr.golf.golfapp.model.GolfEventPlayerId;
import com.pr.golf.golfapp.repository.GolfEventPlayerRepository;
import com.pr.golf.golfapp.repository.GolfEventRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class GolfEventService {

	private GolfEventRepository golfEventRepository;

	private GolfEventPlayerRepository golfEventPlayerRepository;
	
	private GolfEventMapper golfEventMapper;

	private PlayerMapper playerMapper;
	
    public GolfEventService(@Autowired GolfEventRepository golfEventRepository,
    						@Autowired GolfEventPlayerRepository golfEventPlayerRepository,
    						@Autowired GolfEventMapper golfEventMapper,
    						@Autowired PlayerMapper playerMapper) {
    	this.golfEventRepository = golfEventRepository;
    	this.golfEventMapper = golfEventMapper;
    	this.golfEventPlayerRepository = golfEventPlayerRepository;
    	this.playerMapper = playerMapper;
    }
    
    public Optional<GolfEventDTO> getGolfEventById(long eventId) {
    	return Optional.of(Optional.of(golfEventMapper.toDto(
    					Arrays.asList(golfEventRepository.findById(eventId).get()))).get().get(0));
    }
    
    public Optional<GolfEvent> getGolfEventByName(String name) {
    	return golfEventRepository.findByEventName(name);
    }

	public Optional<List<GolfEventDTO>> findByCompetitionId(Long competitionId) {
		// TODO Auto-generated method stub
		return Optional.of(golfEventMapper.toDto(golfEventRepository.findByCompetitionId(competitionId)));
	}

	public Optional<GolfEventDTO> findByEventName(String name) {
		// TODO Auto-generated method stub
		return Optional.of(golfEventMapper.toDto(Arrays.asList(golfEventRepository.findByEventName(name).get())).get(0));
	}

	public List<GolfEventDTO> searchGolfEvents(String searchText, String searchType) {
		// TODO Auto-generated method stub
		return golfEventMapper.toDto(golfEventRepository.searchGolfEvents(searchText, searchType));
	}

	public void deleteById(Long eventId) {
		// TODO Auto-generated method stub
		golfEventRepository.deleteById(eventId);
	}

	public Optional<GolfEventDTO> findById(Long id) {
		return Optional.of(golfEventMapper.toDto(Arrays.asList(golfEventRepository.findById(id).get())).get(0));
	}

	public GolfEventDTO save(GolfEventDTO newEventDTO) {
		// TODO Auto-generated method stub
		List<GolfEvent> golfEvents = golfEventMapper.toEntity(Arrays.asList(newEventDTO));
	    golfEventRepository.saveAll(golfEvents);
	    List<GolfEventPlayer> golfEventPlayers = golfEvents.stream()
	    	    .flatMap(golfEvent -> golfEvent.getPlayers().stream()
	    	        .map(player -> GolfEventPlayer.builder()
	    	        			.id(GolfEventPlayerId.builder()
	    	        					.eventId(golfEvent.getId())
	    	        					.playerId(player.getId())
	    	        					.build())
	    	        			//.event(golfEvent)
	    	        			//.player(player)
	    	        			.build())
	    	    )
	    	    .collect(Collectors.toList());

	    //golfEventPlayerRepository.saveAll(golfEventPlayers);
	    saveGolfEventPlayer(golfEventPlayers);
		return newEventDTO;
	}

    @org.springframework.transaction.annotation.Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveGolfEventPlayer(List<GolfEventPlayer> golfEventPlayer) {
        //golfEventPlayerRepository.saveAll(golfEventPlayer);
    }
	
	public void removePlayerFromEvent(Long eventId, Long playerId) {
		golfEventPlayerRepository.deleteByEventIdAndPlayerId(eventId, playerId);
	}

	public List<PlayerDTO> getPlayersRegisteredForEvent(Long eventId) {
		return playerMapper.toDto(golfEventPlayerRepository.findPlayersRegisteredForEventByEventId(eventId));
	}
	
	
	
	

}
