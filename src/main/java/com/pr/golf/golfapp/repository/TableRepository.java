package com.pr.golf.golfapp.repository;

import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.model.Table;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

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
