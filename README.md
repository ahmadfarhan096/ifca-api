# How To Run Project
> yarn &nbsp;&& &nbsp;yarn dev

# To Override the configuration for the mysql connection
Go to ```config.js``` file then
> replace the ```host```, ```user```, ```password```, ```database``` with your credentials

# Table MySQL configuration
> CREATE TABLE `ifca`.`user` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(45) NULL,
      `email` VARCHAR(45) NULL,
      `phone` VARCHAR(45) NULL,
      `address` VARCHAR(45) NULL,
      PRIMARY KEY (`id`)
  );
