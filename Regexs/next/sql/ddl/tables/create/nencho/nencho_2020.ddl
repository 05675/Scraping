CREATE TABLE `nencho_2020` (
  `task_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nencho_insurance_status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  CONSTRAINT `nencho_2020_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
) /*!50100 TABLESPACE `innodb_system` */ ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/* 
  nencho_insurance_status
  
  NOT_COMPLETED: 0,
  COMPLETED: 1,
  NOT_SUBMITTED: 2,

*/
