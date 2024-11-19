CREATE DATABASE  IF NOT EXISTS "fuelrate" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fuelrate`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: fuelratedatabase-averysschoolprojects.a.aivencloud.com    Database: fuelrate
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '64a582a0-e6e8-11ee-a8cb-9ef3c5aabb92:1-169';

--
-- Table structure for table `ClientInformation`
--

DROP TABLE IF EXISTS `ClientInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientInformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` char(2) NOT NULL,
  `zipcode` varchar(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdProfile_idx` (`userId`),
  CONSTRAINT `userIdProfile` FOREIGN KEY (`userId`) REFERENCES `UserCredentials` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientInformation`
--

LOCK TABLES `ClientInformation` WRITE;
/*!40000 ALTER TABLE `ClientInformation` DISABLE KEYS */;
INSERT INTO `ClientInformation` VALUES (6,1,'Avery Lindseth','1234 Main Street','','Houston','TX','77002'),(11,15,'Avery Lindseth','1234 Some Street','','Houston','TX','77002'),(12,16,'Archibald Humphrey','4300 Martin Luther King Blvd','','Houston','TX','77204'),(13,13,'Rodney Hong','12345 Apple St','','Houston','TX','77429'),(14,2,'Johnny Bravo','1234 Main Street','','Houston','TX','77002');
/*!40000 ALTER TABLE `ClientInformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FuelQuote`
--

DROP TABLE IF EXISTS `FuelQuote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FuelQuote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `number` int NOT NULL,
  `gallonsRequested` int NOT NULL,
  `address` varchar(350) DEFAULT NULL,
  `deliveryDate` char(10) DEFAULT NULL,
  `suggestedPrice` double NOT NULL,
  `totalPrice` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdQuotes` FOREIGN KEY (`userId`) REFERENCES `UserCredentials` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FuelQuote`
--

LOCK TABLES `FuelQuote` WRITE;
/*!40000 ALTER TABLE `FuelQuote` DISABLE KEYS */;
INSERT INTO `FuelQuote` VALUES (10,1,1,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.73,172.5),(11,1,2,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.71,171),(12,1,3,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.71,171),(13,13,1,1,'12345 Apple St  Houston, TX 77429','2024-04-16',1.73,1.73),(14,2,1,100,'1234 Main Street  Houston, TX 77002','2024-03-31',1.73,172.5),(15,2,2,5000,'4300 Martin Luther King Blvd','2025-02-16',10000,50000000),(16,2,3,5000,'4300 Martin Luther King Blvd','2025-02-16',10000,50000000),(17,2,4,5000,'4300 Martin Luther King Blvd','2025-02-16',10000,50000000),(18,2,5,5000,'4300 Martin Luther King Blvd','2025-02-16',10000,50000000);
/*!40000 ALTER TABLE `FuelQuote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCredentials`
--

DROP TABLE IF EXISTS `UserCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCredentials` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCredentials`
--

LOCK TABLES `UserCredentials` WRITE;
/*!40000 ALTER TABLE `UserCredentials` DISABLE KEYS */;
INSERT INTO `UserCredentials` VALUES (1,'avery','$2b$10$pCudhqMwHtFbymS0haCbxOg5UdaPG1dSB3f9FpRY7CpsUtitzLbaq'),(2,'johnny','$2b$10$XRf7hmGU4kINzc.uQTYyf.dd/lRwlhwlxvQjI3YPMzuqhSpMkgjFa'),(12,'test1','$2b$10$upKXSQoezjWL8eufC4DbJ.vb6J4RGhnqvza.QsQ1I5pgNuwKe70s2'),(13,'rodney','$2b$10$qtoL1fbfz3ZFyvt2duH6cuu70l.ljyICaU3ngfMCx3JthhoQeq6vS'),(14,'rodneyyyy','$2b$10$UpujlDUcUx8kQArT7YJjkeoqIV9eW1YE3suppK9k4R1niI8bV8Cv6'),(15,'avery2','$2b$10$nMORcfZQRBp/ZPjgSDBxlurpbUoA6Dy/DA4jXQw16WjeUYSXMws4m'),(16,'bobby','$2b$10$ty7OhvWxfuUlNVl6t/fvG.Ev0yOurAbQdeAE/m.UQKBFntCYQmXl2'),(17,'erffere','$2b$10$jH2CL7RL7vPbyokpNYGR7uHk6LYl9JhVj10CvXWOyu1ln./9YqOfa'),(18,'username','$2b$10$aRrVyEFVzButsEcoAwa.mur3O3bB.xmoXKs0T.Y0p8.fRk.B36Zze'),(19,'richard','$2b$10$08.v/3G7iYhYbCPzWx1uRuxv3cR9agzl9QFS4Bhkxs5eTsIDVqWO2'),(21,'papajh','$2b$10$loPwX4w6nx.LXsYJDrFAB.4yjokEffoPa2/TW4g5610LT6gED72gK'),(24,'joebogey','$2b$10$3A04mptfN3669LrYrI1o4ufb4SoDTHarxu.IOoqbN1o/g3MJAM9Um'),(25,'z6pbhpc0','$2b$10$APaIAP82ZHrgoGY6SX1NGegwXbvIuT2L2CsGfBLFZQT1jYxE2upFK'),(26,'w99d6g66','$2b$10$.rB9am71xIzkHipohdXBCeW5GpIttn12Nh4koLppccq0f0mecL6Cy'),(27,'uckacf03','$2b$10$7Bim.6Qbb8dURTSFsFoE7eGKZf98F9SmxoV35jhq.hKXmuVdqwj.q'),(28,'4x3izqgh','$2b$10$AT59FXPk9gzYq9ulyEW4juHDN6Ziv9LbInvi9DxrBRHEzfz9GmkUW'),(29,'u7uurxcf','$2b$10$D6NNsTId/QwdTaKQHymkre/gpmc5ZUTaCVk8iyQOYga5gjelL91Yq'),(30,'s6hkkihx','$2b$10$j.Bw3ohpNFSbhs98JnsSg.Yz.ZcyeQiLZIUN0KKHnGKWmFX5QUXnG'),(31,'uhx1x8nx','$2b$10$/RjpeAOxuSopXAXPESj..uabJcfqp.gowZ3LJqronmIrCr6r5X2he'),(32,'zcd177wc','$2b$10$9y0FUuINZJTUO1cyQasdIuC4Gw7zJjU4mw2mV6sxnneU9mL5zUQuq'),(33,'8orj6h4b','$2b$10$f1StdFRMm5rPjLXjzgxUK.lrxDJlCD6/Y/ufSODMCy.dwQ02tmwxa'),(34,'2a9x4tvu','$2b$10$pn8.KV/TRWzhRIu1u5b3lux1jM9LjRc9bmySGL2HXxlhSQd6jpBp.'),(35,'cjfa6jqo','$2b$10$kBv2aywGqkO.TvMsEMRFtuo6GSeljYCqmHYSLD/5HtvXrRbYDsFGC');
/*!40000 ALTER TABLE `UserCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fuelrate'
--

--
-- Dumping routines for database 'fuelrate'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11 14:22:25
