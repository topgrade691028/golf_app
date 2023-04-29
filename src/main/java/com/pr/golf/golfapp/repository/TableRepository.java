package com.pr.golf.golfapp.repository;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.model.Table;

@Component
public class TableRepository {

    private ConcurrentHashMap<Long, Table> map = new ConcurrentHashMap();

    public Table save(Table table) {
        Table returnedTable = map.get(table.getCompetitionId());
       return returnedTable;
    }

    public Table update(Table table) {
        Table returnedTable = map.put(table.getTableId(), table);
        return returnedTable;
    }
}
