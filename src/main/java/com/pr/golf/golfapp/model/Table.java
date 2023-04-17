package com.pr.golf.golfapp.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class Table {

    private long tableId;

    private long competitionId;

}
