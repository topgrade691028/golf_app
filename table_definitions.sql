CREATE TABLE hole (id bigint(20),course_id int(11),name varchar(20),hole_number int(11),par int(11),stroke int(11),white int(11),yellow int(11),red int(11),FOREIGN KEY (course_id) REFERENCES golf_course(id));

CREATE TABLE score (id bigint(20),competition_id int(11),player_id int(11),event_id int(11),par int(11),score int(11),points int(11),hole_id int(11),stroke int(11),);

CREATE TABLE competition_player (competition_id bigint(20),player_id bigint(20),);

CREATE TABLE golf_leader_board (id bigint(20),competition_id bigint(20),player_id int(11),avg_score_per_round int(11),best_five_total_round int(11),bonus_rounds int(11),total_points int(11),total_score int(11),);

CREATE TABLE competition (id bigint(20),name varchar(40),competition_type varchar(20),);

CREATE TABLE competition_player (competition_id bigint(20),player_id bigint(20),);

CREATE TABLE player_grouping (grouping_id bigint(20),event_id bigint(20),group_number int(11),player_id bigint(20),FOREIGN KEY (event_id) REFERENCES golf_event(id),FOREIGN KEY (player_id) REFERENCES player(id));

CREATE TABLE golf_event (id bigint(20),name varchar(255),venue varchar(255),type varchar(255),competition_id bigint(20),date date,golf_course_id bigint(20),);

CREATE TABLE golf_event_player (event_id bigint(20),player_id bigint(20),);

CREATE TABLE golf_course (id int(11),name varchar(40),address varchar(50),);

CREATE TABLE golf_event_player (event_id bigint(20),player_id bigint(20),);

CREATE TABLE player (id bigint(20),name varchar(255),userName varchar(255),handicap int(11),);

CREATE TABLE player_grouping (grouping_id bigint(20),event_id bigint(20),group_number int(11),player_id bigint(20),FOREIGN KEY (event_id) REFERENCES golf_event(id),FOREIGN KEY (player_id) REFERENCES player(id));

