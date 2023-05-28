CREATE TABLE player (
  id BIGINT(20) PRIMARY KEY,
  name VARCHAR(255),
  userName VARCHAR(255),
  handicap INT(11)
);

CREATE TABLE golf_course (
  id INT(11) PRIMARY KEY,
  name VARCHAR(40),
  address VARCHAR(50)
);

CREATE TABLE competition (
  id BIGINT(20) PRIMARY KEY,
  name VARCHAR(40),
  competition_type VARCHAR(20)
);

CREATE TABLE hole (
  id BIGINT(20) PRIMARY KEY,
  course_id INT(11),
  name VARCHAR(20),
  hole_number INT(11),
  par INT(11),
  stroke INT(11),
  white INT(11),
  yellow INT(11),
  red INT(11),
  FOREIGN KEY (course_id) REFERENCES golf_course (id)
);

CREATE TABLE golf_event (
  id BIGINT(20) PRIMARY KEY,
  name VARCHAR(255),
  venue VARCHAR(255),
  type VARCHAR(255),
  competition_id BIGINT(20),
  date DATE,
  golf_course_id INT(11),
  FOREIGN KEY (competition_id) REFERENCES competition (id),
  FOREIGN KEY (golf_course_id) REFERENCES golf_course (id)
);

CREATE TABLE player_grouping (
  grouping_id BIGINT(20) PRIMARY KEY,
  event_id BIGINT(20),
  group_number INT(11),
  player_id BIGINT(20),
  FOREIGN KEY (event_id) REFERENCES golf_event (id),
  FOREIGN KEY (player_id) REFERENCES player (id)
);

CREATE TABLE golf_event_player (
  event_id BIGINT(20),
  player_id BIGINT(20),
  PRIMARY KEY (event_id, player_id),
  FOREIGN KEY (event_id) REFERENCES golf_event (id),
  FOREIGN KEY (player_id) REFERENCES player (id)
);

CREATE TABLE competition_player (
  competition_id BIGINT(20),
  player_id BIGINT(20),
  PRIMARY KEY (competition_id, player_id),
  FOREIGN KEY (competition_id) REFERENCES competition (id),
  FOREIGN KEY (player_id) REFERENCES player (id)
);

CREATE TABLE golf_leader_board (
  id BIGINT(20) PRIMARY KEY,
  competition_id BIGINT(20),
  player_id BIGINT(20),
  avg_score_per_round INT(11),
  best_five_total_round INT(11),
  bonus_rounds INT(11),
  total_points INT(11),
  total_score INT(11),
  FOREIGN KEY (competition_id) REFERENCES competition (id),
  FOREIGN KEY (player_id) REFERENCES player (id)
);

CREATE TABLE score (
  id BIGINT(20) PRIMARY KEY,
  competition_id BIGINT(20),
  player_id BIGINT(20),
  event_id BIGINT(20),
  par INT(11),
  score INT(11),
  points INT(11),
  hole_id BIGINT(20),
  stroke INT(11),
  FOREIGN KEY (competition_id) REFERENCES competition (id),
  FOREIGN KEY (player_id) REFERENCES player (id),
  FOREIGN KEY (event_id) REFERENCES golf_event (id),
  FOREIGN KEY (hole_id) REFERENCES hole (id)
);
