CREATE TABLE `insurance_categories` (
  `id` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) /*!50100 TABLESPACE `innodb_system` */ ENGINE=InnoDB DEFAULT CHARSET=utf8;