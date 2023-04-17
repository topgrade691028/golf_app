package com.pr.golf.golfapp.model;

import com.pr.golf.golfapp.enums.Type;
import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@Getter
@EqualsAndHashCode
@ToString
public class Event {

    private Long id;

    private String name;

    public String venue;

    public Type type;

}
