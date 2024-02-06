-- MariaDB dump 10.19-11.1.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: golfapp
-- ------------------------------------------------------
-- Server version	11.1.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `competition`
--

DROP TABLE IF EXISTS `competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `competition_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition`
--

LOCK TABLES `competition` WRITE;
/*!40000 ALTER TABLE `competition` DISABLE KEYS */;
INSERT INTO `competition` VALUES
(38,'Showdown','STABLEFORD'),
(39,'afdfdfsd','STABLEFORD'),
(40,'fsadfsdadsfafds','STABLEFORD');
/*!40000 ALTER TABLE `competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition_player`
--

DROP TABLE IF EXISTS `competition_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition_player` (
  `competition_id` bigint(20) NOT NULL,
  `player_id` bigint(20) NOT NULL,
  PRIMARY KEY (`competition_id`,`player_id`),
  KEY `competition_player_ibfk_2` (`player_id`),
  CONSTRAINT `competition_player_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition_player`
--

LOCK TABLES `competition_player` WRITE;
/*!40000 ALTER TABLE `competition_player` DISABLE KEYS */;
INSERT INTO `competition_player` VALUES
(33,1),
(34,1),
(35,1),
(38,1),
(33,2),
(34,2),
(35,2),
(38,2),
(33,3),
(34,3),
(35,3),
(33,4),
(34,4),
(35,4),
(33,5),
(34,5),
(35,5),
(34,6);
/*!40000 ALTER TABLE `competition_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `golf_course`
--

DROP TABLE IF EXISTS `golf_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `golf_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golf_course`
--

LOCK TABLES `golf_course` WRITE;
/*!40000 ALTER TABLE `golf_course` DISABLE KEYS */;
INSERT INTO `golf_course` VALUES
(11,'Chesunt',NULL),
(12,'Essendon','Essendon'),
(13,'Kilsworth Springs',NULL);
/*!40000 ALTER TABLE `golf_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `golf_event`
--

DROP TABLE IF EXISTS `golf_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `golf_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `competition_id` bigint(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `golf_course_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_competition_id` (`competition_id`),
  CONSTRAINT `fk_competition_id` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golf_event`
--

LOCK TABLES `golf_event` WRITE;
/*!40000 ALTER TABLE `golf_event` DISABLE KEYS */;
INSERT INTO `golf_event` VALUES
(35,'test','Aldenham',NULL,38,NULL,NULL);
/*!40000 ALTER TABLE `golf_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `golf_event_player`
--

DROP TABLE IF EXISTS `golf_event_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `golf_event_player` (
  `event_id` bigint(20) NOT NULL,
  `player_id` bigint(20) NOT NULL,
  PRIMARY KEY (`event_id`,`player_id`),
  KEY `golf_event_player_ibfk_2` (`player_id`),
  CONSTRAINT `golf_event_player_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golf_event_player`
--

LOCK TABLES `golf_event_player` WRITE;
/*!40000 ALTER TABLE `golf_event_player` DISABLE KEYS */;
INSERT INTO `golf_event_player` VALUES
(32,1),
(32,2),
(32,3),
(32,4),
(32,5);
/*!40000 ALTER TABLE `golf_event_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `golf_leader_board`
--

DROP TABLE IF EXISTS `golf_leader_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `golf_leader_board` (
  `id` bigint(20) NOT NULL,
  `competition_id` bigint(20) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  `avg_score_per_round` int(11) DEFAULT NULL,
  `best_five_total_round` int(11) DEFAULT NULL,
  `bonus_rounds` int(11) DEFAULT NULL,
  `total_points` int(11) DEFAULT NULL,
  `total_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_golf_leader_board_competition` (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golf_leader_board`
--

LOCK TABLES `golf_leader_board` WRITE;
/*!40000 ALTER TABLE `golf_leader_board` DISABLE KEYS */;
INSERT INTO `golf_leader_board` VALUES
(1,1,1,0,0,0,0,0),
(2,1,2,0,0,0,0,0),
(3,1,3,0,0,0,0,0),
(4,2,1,0,0,0,0,0),
(5,2,2,0,0,0,0,0),
(6,2,3,0,0,0,0,0);
/*!40000 ALTER TABLE `golf_leader_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hole`
--

DROP TABLE IF EXISTS `hole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hole` (
  `id` bigint(20) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `hole_number` int(11) DEFAULT NULL,
  `par` int(11) DEFAULT NULL,
  `stroke` int(11) DEFAULT NULL,
  `white` int(11) DEFAULT NULL,
  `yellow` int(11) DEFAULT NULL,
  `red` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `hole_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `golf_course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hole`
--

LOCK TABLES `hole` WRITE;
/*!40000 ALTER TABLE `hole` DISABLE KEYS */;
INSERT INTO `hole` VALUES
(1,NULL,'Quarryside',1,4,12,355,349,332),
(2,NULL,'Bill Atkin’s Way',2,3,6,167,141,124),
(3,NULL,'Fordsway',3,5,18,504,494,478),
(4,NULL,'The Cut',4,4,2,428,414,388),
(5,NULL,'Nick Melvin\'s Way',5,4,14,374,358,335),
(6,NULL,'Devil\'s Toenail',6,3,4,149,140,127),
(7,NULL,'Hobby\'s Retreat',7,4,8,368,358,32),
(8,NULL,'The Furrow',8,5,16,496,483,459),
(9,NULL,'The Dell',9,4,10,391,377,353),
(10,NULL,'Old Bottles',10,5,9,532,516,483),
(11,NULL,'Red Shank',11,3,15,162,146,124),
(12,NULL,'Roger\'s Place',12,4,3,417,412,348),
(13,NULL,'Lakeside',13,4,1,367,360,335),
(14,NULL,'Bridleway',14,4,17,345,335,308),
(15,NULL,'The Summit',15,5,13,469,458,390),
(16,NULL,'Poppy Bank',16,4,7,396,384,358),
(17,NULL,'Up or Down',17,4,5,388,379,368),
(18,NULL,'The Old Fort',18,3,11,201,174,155),
(50,11,NULL,1,5,7,560,549,459),
(51,11,NULL,2,4,15,325,312,302),
(52,11,NULL,3,3,9,211,202,190),
(53,11,NULL,4,4,11,364,356,343),
(54,11,NULL,5,4,1,457,430,364),
(55,11,NULL,6,4,5,424,411,401),
(56,11,NULL,7,3,13,181,143,133),
(57,11,NULL,8,4,17,370,367,350),
(58,11,NULL,9,4,3,424,413,404),
(59,11,NULL,10,4,2,444,411,365),
(60,11,NULL,11,3,12,183,169,157),
(61,11,NULL,12,5,16,490,473,398),
(62,11,NULL,13,4,14,329,314,303),
(63,11,NULL,14,4,10,365,351,341),
(64,11,NULL,15,4,8,394,361,284),
(65,11,NULL,16,4,6,375,367,353),
(66,11,NULL,17,3,18,136,114,95),
(67,11,NULL,18,5,4,551,495,456),
(86,12,'Hole 1',1,4,9,380,341,327),
(87,12,'Hole 2',2,3,3,200,185,157),
(88,12,'Hole 3',3,5,7,475,464,426),
(89,12,'Hole 4',4,5,17,350,334,455),
(90,12,'Hole 5',5,4,13,189,169,293),
(91,12,'Hole 6',6,3,5,495,485,148),
(92,12,'Hole 7',7,4,1,372,307,337),
(93,12,'Hole 8',8,4,15,432,410,322),
(94,12,'Hole 9',9,3,11,145,128,135),
(95,12,'Hole 10',10,4,8,465,443,291),
(96,12,'Hole 11',11,5,4,393,370,451),
(97,12,'Hole 12',12,4,10,517,469,325),
(98,12,'Hole 13',13,3,14,474,462,158),
(99,12,'Hole 14',14,5,18,330,304,462),
(100,12,'Hole 15',15,4,2,208,162,282),
(101,12,'Hole 16',16,4,6,373,351,397),
(102,12,'Hole 17',17,3,16,340,332,119),
(103,12,'Hole 18',18,5,12,213,175,424);
/*!40000 ALTER TABLE `hole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `handicap` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES
(1,'Darragh Flynn','dflynn',28),
(2,'Paul Ronane','pronane',21),
(3,'Mike Creaton','mcreaton',24),
(4,'John Kerins','jkerins',24),
(5,'Vinnie Guilfoyle','vguilfoyle',19),
(6,'Tom Hanlon','thanlon',22),
(7,'Joe Sink','jsink',24),
(8,'John Kelly','jkelly',28),
(9,'Sam Walsh','swalsh',14),
(10,'paul ronane test',NULL,12),
(11,'null null',NULL,19),
(12,'null null',NULL,18),
(13,'null null',NULL,14),
(14,'null null',NULL,18),
(15,'null null',NULL,17),
(16,'null null',NULL,18),
(17,'null null',NULL,11),
(18,'null null',NULL,0),
(19,'null null',NULL,0),
(20,'null null',NULL,0);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_grouping`
--

DROP TABLE IF EXISTS `player_grouping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_grouping` (
  `grouping_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_id` bigint(20) DEFAULT NULL,
  `group_number` int(11) DEFAULT NULL,
  `player_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`grouping_id`),
  KEY `player_grouping_ibfk_1` (`event_id`),
  KEY `player_grouping_ibfk_2` (`player_id`),
  CONSTRAINT `player_grouping_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `golf_event` (`id`) ON DELETE CASCADE,
  CONSTRAINT `player_grouping_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_grouping`
--

LOCK TABLES `player_grouping` WRITE;
/*!40000 ALTER TABLE `player_grouping` DISABLE KEYS */;
INSERT INTO `player_grouping` VALUES
(74,35,1,1),
(75,35,1,2);
/*!40000 ALTER TABLE `player_grouping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_role_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_COMPETITION_MANAGER'),
(3,'ROLE_PLAYER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `id` bigint(20) NOT NULL,
  `competition_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `par` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `hole_id` int(11) DEFAULT NULL,
  `stroke` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `score_ibfk_1` (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES
(45,NULL,1,1,NULL,5,4,50,NULL),
(46,NULL,1,1,NULL,5,2,51,NULL),
(47,NULL,2,1,NULL,5,3,50,NULL),
(48,NULL,2,1,NULL,5,2,51,NULL),
(141,NULL,1,1,NULL,3,4,52,NULL),
(142,NULL,2,1,NULL,4,2,52,NULL),
(143,NULL,1,1,NULL,4,4,53,NULL),
(144,NULL,1,1,NULL,7,1,54,NULL),
(145,NULL,1,1,NULL,7,1,55,NULL),
(146,NULL,1,1,NULL,4,2,56,NULL),
(147,NULL,1,1,NULL,5,2,57,NULL),
(148,NULL,1,1,NULL,4,4,58,NULL),
(149,NULL,2,1,NULL,6,1,53,NULL),
(150,NULL,2,1,NULL,6,2,54,NULL),
(151,NULL,2,1,NULL,5,2,55,NULL),
(152,NULL,2,1,NULL,3,3,56,NULL),
(153,NULL,2,1,NULL,5,2,57,NULL),
(154,NULL,2,1,NULL,5,3,58,NULL),
(155,NULL,1,1,NULL,7,1,59,NULL),
(156,NULL,1,1,NULL,6,0,60,NULL),
(157,NULL,1,1,NULL,7,1,61,NULL),
(158,NULL,1,1,NULL,4,3,62,NULL),
(159,NULL,1,1,NULL,7,1,63,NULL),
(160,NULL,1,1,NULL,8,0,64,NULL),
(161,NULL,1,1,NULL,6,2,65,NULL),
(162,NULL,1,1,NULL,5,1,66,NULL),
(163,NULL,1,1,NULL,9,0,67,NULL),
(164,NULL,2,1,NULL,9,0,59,NULL),
(165,NULL,2,1,NULL,5,1,60,NULL),
(166,NULL,2,1,NULL,8,0,61,NULL),
(167,NULL,2,1,NULL,5,2,62,NULL),
(168,NULL,2,1,NULL,6,1,63,NULL),
(169,NULL,2,1,NULL,5,2,64,NULL),
(170,NULL,2,1,NULL,6,1,65,NULL),
(171,NULL,2,1,NULL,3,3,66,NULL),
(172,NULL,2,1,NULL,7,2,67,NULL);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_roles_user` (`user_id`),
  KEY `fk_user_roles_role` (`role_id`),
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES
(5,5,1),
(6,5,2),
(7,5,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(5,'pronane@yahoo.com','Rnm3dWBciaRfFGdh4IdAont8rUR2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-06 19:06:05
