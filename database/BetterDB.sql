-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema betterDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `betterDB` ;

-- -----------------------------------------------------
-- Schema betterDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `betterDB` DEFAULT CHARACTER SET utf8 ;
USE `betterDB` ;

-- -----------------------------------------------------
-- Table `betterDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betterDB`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zip` VARCHAR(4) NOT NULL,
  `street` VARCHAR(100) NOT NULL,
  `card_number` VARCHAR(16) NOT NULL,
  `birthdate` DATE NOT NULL,
  `credit` DECIMAL(8,2) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `card_number_UNIQUE` (`card_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betterDB`.`bets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betterDB`.`bets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bet` VARCHAR(45) NOT NULL,
  `amount` DECIMAL(8,2) NOT NULL,
  `date` DATE NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_bets_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_bets_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `betterDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `betterDB`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `betterDB`;
INSERT INTO `betterDB`.`users` (`id`, `username`, `password`, `email`, `city`, `zip`, `street`, `card_number`, `birthdate`, `credit`) VALUES (1, 'Bob', 'Azerty123', 'bob.bobson@gmail.com', 'Gent', '9000', 'Straat 1', 'BE12345678912345', '1990-01-31', 50.75);

COMMIT;


-- -----------------------------------------------------
-- Data for table `betterDB`.`bets`
-- -----------------------------------------------------
START TRANSACTION;
USE `betterDB`;
INSERT INTO `betterDB`.`bets` (`id`, `bet`, `amount`, `date`, `users_id`) VALUES (1, 'test', 10, '2021-05-01', 1);

COMMIT;

