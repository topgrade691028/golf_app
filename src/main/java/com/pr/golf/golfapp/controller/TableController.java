package com.pr.golf.golfapp.controller;

import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;
import com.pr.golf.golfapp.model.Table;
import com.pr.golf.golfapp.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/tables")
public class TableController {


    private final static AtomicLong subIdCounter = new AtomicLong(System.nanoTime());

    @Autowired
    private TableService tableService;
    
    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createTable(@RequestBody List<Score> scores) throws URISyntaxException {
        System.out.print("Test");
        scores.forEach(table -> {
            Long tableId = subIdCounter.incrementAndGet();
            table.setId(tableId);
        });
        Table savedTable = tableService.save(scores);
        return ResponseEntity.created(new URI("/tables/" + 1)).body(savedTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTable(@PathVariable Long id, @RequestBody List<Score> scores) {
        Table updatedTable = tableService.update(scores);

        return ResponseEntity.ok(updatedTable);
    }
    @GetMapping("/{id}")
    public Table getEvent(@PathVariable Long id) {
        return tableService.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(value = "/eventId/{eventId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Table getTablesForEvent(@PathVariable Long eventId) {
        return tableService.findByEventId(eventId).orElseThrow(RuntimeException::new);
    }
}
