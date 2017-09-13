CREATE database payment_api;

USE payment_api;

CREATE TABLE `payments` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`payment_type` varchar(255) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`status` varchar(255) NOT NULL,
	`date` DATE,
	`description` text,
	`responsable_name` text,
	PRIMARY KEY (id)
);