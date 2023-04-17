package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.model.EventLeaderBoard;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;

@Component
public class TableService {

    //@Autowired
   // private TableRepository tableRepository;

    public Table updateTable(List<Score> savedScore) {
        return EventLeaderBoard.builder().build();
    }

    public Table save(List<Score> scores) {
        return Table.builder().build();
    }

    public Table update(List<Score> scores) {
        return Table.builder().build();
    }

    public Optional<Table> findById(Long id) {
        return Optional.of(Table.builder().build());
    }

    public Optional<Table> findByEventId(Long eventId) {
        return Optional.of(Table.builder().build());
    }
}
