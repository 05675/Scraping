CREATE TABLE `nencho_insurance_life_input_2020` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nencho_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firm_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `category_detail` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `period` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `contractor_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `receiver_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `relation` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `payment` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nencho_insurance_life_input_2020_ibfk_1` (`category`),
  KEY `nencho_insurance_life_input_2020_ibfk_2` (`nencho_id`),
  CONSTRAINT `nencho_insurance_life_input_2020_ibfk_1` FOREIGN KEY (`category`) REFERENCES `insurance_categories` (`id`),
  CONSTRAINT `nencho_insurance_life_input_2020_ibfk_2` FOREIGN KEY (`nencho_id`) REFERENCES `nencho_2020` (`task_id`) ON DELETE CASCADE
) /*!50100 TABLESPACE `innodb_system` */ ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

