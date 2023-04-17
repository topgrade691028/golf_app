package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.model.Event;

@Component
public class EventRepository {
    ConcurrentHashMap<Long, Event> eventMap = new ConcurrentHashMap();

    public Optional<Event> findById(Long id) {
        return Optional.of(eventMap.get(id));
    }

    public Event save(Event event) {
         eventMap.put(event.getId(), event);
         return event;
    }

    public void deleteById(Long id) {
        eventMap.remove(id);
    }

	public Optional<List<Event>> findByCompetitionId(Long competitionId) {
		return null;
	}

}
