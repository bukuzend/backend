CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ach_prof`
--

DROP TABLE IF EXISTS `ach_prof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ach_prof` (
  `ach_id` int unsigned NOT NULL,
  `prof_id` int unsigned NOT NULL,
  PRIMARY KEY (`ach_id`,`prof_id`),
  KEY `fk_Ach_Prof_Prof_data1_idx` (`prof_id`),
  KEY `fk_Ach_Prof_Achievements1` (`ach_id`),
  CONSTRAINT `fk_Ach_Prof_Achievements1` FOREIGN KEY (`ach_id`) REFERENCES `achievements` (`ach_id`),
  CONSTRAINT `fk_Ach_Prof_Prof_data1` FOREIGN KEY (`prof_id`) REFERENCES `prof_data` (`prof_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ach_prof`
--

LOCK TABLES `ach_prof` WRITE;
/*!40000 ALTER TABLE `ach_prof` DISABLE KEYS */;
INSERT INTO `ach_prof` VALUES (1,2),(3,2),(2,5),(1,9),(1,27),(1,29),(1,30);
/*!40000 ALTER TABLE `ach_prof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `ach_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`ach_id`),
  UNIQUE KEY `ach_id_UNIQUE` (`ach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'Achiev1','ImagAciev1'),(2,'Achiev2','ImagAciev2'),(3,'Achiev3','ImagAciev3');
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive_dragons`
--

DROP TABLE IF EXISTS `archive_dragons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_dragons` (
  `dragon_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime DEFAULT NULL,
  PRIMARY KEY (`dragon_id`),
  UNIQUE KEY `dragon_id_UNIQUE` (`dragon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_dragons`
--

LOCK TABLES `archive_dragons` WRITE;
/*!40000 ALTER TABLE `archive_dragons` DISABLE KEYS */;
INSERT INTO `archive_dragons` VALUES (1,'NameDrag1','DescDrag1','ImagDrag1','2024-03-03 21:31:55',NULL),(2,'NameDrag2','DescDrag2','ImagDrag2','2024-03-03 21:31:55',NULL),(3,'NameDrag3','DescDrag3','ImagDrag3','2024-03-03 21:31:55',NULL);
/*!40000 ALTER TABLE `archive_dragons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive_statistics`
--

DROP TABLE IF EXISTS `archive_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_statistics` (
  `stat_id` int unsigned NOT NULL,
  `geo_loc` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `veracity` tinyint NOT NULL,
  `image` varchar(1000) NOT NULL,
  `users_id` int unsigned NOT NULL,
  `dragon_id` int unsigned NOT NULL,
  PRIMARY KEY (`stat_id`,`dragon_id`,`users_id`),
  UNIQUE KEY `idArchive_statistics_UNIQUE` (`stat_id`),
  KEY `fk_Archive_statistics_Archive_users1_idx` (`users_id`),
  KEY `fk_Archive_statistics_Archive_dragons1_idx` (`dragon_id`),
  CONSTRAINT `fk_Archive_statistics_Archive_dragons1` FOREIGN KEY (`dragon_id`) REFERENCES `archive_dragons` (`dragon_id`),
  CONSTRAINT `fk_Archive_statistics_Archive_users1` FOREIGN KEY (`users_id`) REFERENCES `archive_users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_statistics`
--

LOCK TABLES `archive_statistics` WRITE;
/*!40000 ALTER TABLE `archive_statistics` DISABLE KEYS */;
INSERT INTO `archive_statistics` VALUES (1,'1111','2024-03-04 01:57:40',0,'test-2024-3-4-01-57-40.jpeg',2,1),(4,'1111','2024-03-04 03:10:18',1,'test3-2024-3-4-03-10-18.jpeg',7,1);
/*!40000 ALTER TABLE `archive_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive_users`
--

DROP TABLE IF EXISTS `archive_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_users` (
  `users_id` int unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `sname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` int NOT NULL,
  `date_start` datetime NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `idArchive_users_UNIQUE` (`users_id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive_users`
--

LOCK TABLES `archive_users` WRITE;
/*!40000 ALTER TABLE `archive_users` DISABLE KEYS */;
INSERT INTO `archive_users` VALUES (1,'Admin','Admin','Admin','popovio@vogu35.ru',1,'2024-03-03 18:50:23'),(2,'test','fname','sname','email',0,'2024-03-03 19:26:53'),(3,'test2','fname2','sname2','email2',0,'2024-03-03 21:43:52'),(7,'test3','fname3','sname3','email3',0,'2024-03-04 03:07:11'),(8,'person','dawdswa','dawd','dwadwa',0,'2024-04-16 12:41:03'),(9,'person69','dawdswa','dawd','dwadwa',0,'2024-04-16 12:42:12'),(10,'bukuzend','Илья','Попов','bukuzend@gmail.com',0,'2024-04-18 00:07:27');
/*!40000 ALTER TABLE `archive_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dragonflys`
--

DROP TABLE IF EXISTS `dragonflys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dragonflys` (
  `dragon_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`dragon_id`),
  UNIQUE KEY `dragon_id_UNIQUE` (`dragon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dragonflys`
--

LOCK TABLES `dragonflys` WRITE;
/*!40000 ALTER TABLE `dragonflys` DISABLE KEYS */;
INSERT INTO `dragonflys` VALUES (1,'NameDrag1','DescDrag1','ImagDrag1.jpeg'),(2,'NameDrag2','DescDrag2','ImagDrag1.jpeg'),(3,'NameDrag3','DescDrag3','ImagDrag1.jpeg');
/*!40000 ALTER TABLE `dragonflys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logins` (
  `login_id` int unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `hash` varchar(200) NOT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,'Admin','$2b$05$4ovuvYuEK1ioGruzM/nGKeKCtAwK4sHxXlU0i.clozP399pWKeMGC'),(3,'test','$2b$05$Al2Q3IZBL9oMa/aFhd4jF.DzfR5rdC2lMWA4dSB0Gj5pX5nrc9gMq'),(4,'test2','$2b$05$y9F1GEVP.Ry0BASPECQVQuv8ixLzYwyFVqqxIhOPplJ0136zfh/na'),(9,'test3','$2b$05$3zM2woIizjf2rtAJy/Mdzec9LYGNAaejQYeyL/uSG9gUNPVrwNpgO'),(60,'dawdaw','$2b$05$.8f.6YTt7B1R3yjYeZTpiugCTeyGpuH9ixHc3hYQyUUT3DRtKFm/y'),(68,'NewUser','$2b$05$yuVIkwAAv4fEEKo4zw2HXOPoFSvrwtnXF/hwa6z1lDrGIYheOIHE2'),(69,'NewUser1','$2b$05$Bzs/vQAU9VEjUGJYK2i9mObt.2qxkQT84afSscMXo9xpnEvIstfpO'),(70,'person','$2b$05$03I7a/Fc56t53KyGAhx/1OJOoIie6pQvK3tIHmR4r8XtdCSSNH2wK'),(71,'person2','$2b$05$W1lhrfGDmi/93uvW.AqF4Od/0MvzpidHSpf/QCU1TbV6ViOV3SrOO'),(73,'person3','$2b$05$LE1r1hy.SDvIpkA8MnnEteHUNDF0v/9VECO1/zsPiljP9TxkIMdzC'),(74,'person4','$2b$05$y/w3o.f7VV2VNWVxXyJvdeU9mGV8LLixiZ7mTQ5w72/PN3GVpfzAW'),(77,'person69','$2b$05$miM0FoTksk3VXvczmoYNv.7ExYX2ry8LmsnLGFZ9tBhK3vq/Cmuim'),(78,'bukuzend','$2b$05$H64Wux8ZToxf4nRT7EzJMeUa5gYPrB2aLT9apxF.Yw60WSuxhM91G');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lvls`
--

DROP TABLE IF EXISTS `lvls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lvls` (
  `lvl_id` int NOT NULL AUTO_INCREMENT,
  `lvl_range` int NOT NULL,
  `emoji` varchar(50) NOT NULL,
  PRIMARY KEY (`lvl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lvls`
--

LOCK TABLES `lvls` WRITE;
/*!40000 ALTER TABLE `lvls` DISABLE KEYS */;
INSERT INTO `lvls` VALUES (1,5,'emoji1'),(2,10,'emoji2'),(3,15,'emoji3');
/*!40000 ALTER TABLE `lvls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prof_data`
--

DROP TABLE IF EXISTS `prof_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prof_data` (
  `prof_id` int unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) NOT NULL,
  `sname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `lvl` int unsigned NOT NULL,
  `image` varchar(1000) NOT NULL,
  `role` int NOT NULL,
  `login_id` int unsigned NOT NULL,
  PRIMARY KEY (`prof_id`,`login_id`),
  UNIQUE KEY `idtable1_UNIQUE` (`prof_id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`),
  KEY `fk_Prof_data_Logins_idx` (`login_id`),
  CONSTRAINT `fk_Prof_data_Logins` FOREIGN KEY (`login_id`) REFERENCES `logins` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prof_data`
--

LOCK TABLES `prof_data` WRITE;
/*!40000 ALTER TABLE `prof_data` DISABLE KEYS */;
INSERT INTO `prof_data` VALUES (1,'Admin','Admin','popovio@vogu35.ru',1,'profile.svg',1,1),(2,'fname','sname','email',1,'profile.svg',0,3),(5,'fname2','sname2','email2',1,'profile.svg',0,4),(9,'fname3','sname3','email3',1,'profile.svg',0,9),(27,'dawdswa','dawd','dwadwa',1,'profile.svg',0,70),(29,'dawdswa','dawd','dwadwa',1,'profile.svg',0,77),(30,'Илья','Попов','bukuzend@gmail.com',1,'profile.svg',0,78);
/*!40000 ALTER TABLE `prof_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `stat_id` int NOT NULL AUTO_INCREMENT,
  `geo_loc` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `image` varchar(1000) NOT NULL,
  `login_id` int unsigned NOT NULL,
  `dragon_id` int NOT NULL,
  PRIMARY KEY (`stat_id`,`dragon_id`,`login_id`),
  KEY `fk_Statistics_Logins1_idx` (`login_id`),
  KEY `fk_Statistics_Dragonflys1_idx` (`dragon_id`),
  CONSTRAINT `fk_Statistics_Dragonflys1` FOREIGN KEY (`dragon_id`) REFERENCES `dragonflys` (`dragon_id`),
  CONSTRAINT `fk_Statistics_Logins1` FOREIGN KEY (`login_id`) REFERENCES `logins` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (2,'1111','2024-03-04 02:07:20','test-2024-3-4-02-07-20.jpeg',3,1),(3,'1111','2024-03-04 02:09:54','test2-2024-3-4-02-09-54.jpeg',4,1),(5,'59.2150528 39.8655488','2024-04-18 00:05:18','test3-2024-4-18-00-05-18.jpeg',9,1),(6,'59.2150528 39.8655488','2024-04-18 00:06:20','bukuzend-2024-4-18-00-06-20.jpeg',78,1),(7,'59.2011681 39.8643236','2024-04-19 18:44:31','test3-2024-4-19-18-44-31.jpeg',9,1);
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `login` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2024-04-21  6:13:34
