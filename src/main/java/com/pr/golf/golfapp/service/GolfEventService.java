package com.pr.golf.golfapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.repository.GolfEventRepository;

@Service
public class GolfEventService {

	private GolfEventRepository golfEventRepository;
	
    public GolfEventService(@Autowired GolfEventRepository golfEventRepository) {
    	this.golfEventRepository = golfEventRepository;
    }
    
    public Optional<GolfEvent> getGolfEventById(long eventId) {
    	return golfEventRepository.findById(eventId);
    }
    
    public Optional<GolfEvent> getGolfEventByName(String name) {
    	return golfEventRepository.findByEventName(name);
    }

}
