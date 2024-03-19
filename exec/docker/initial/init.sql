CREATE DATABASE IF NOT EXISTS tfeo_test;
CREATE DATABASE IF NOT EXISTS tfeo_temp;

create user 'tfeo'@'%' identified by 'tfeo123';
grant all privileges on `dotori_test`.* to 'tfeo'@'%';
grant all privileges on `dotori_temp`.* to 'tfeo'@'%';
flush privileges;


DELIMITER //
CREATE PROCEDURE GrantPrivilegesIfUserExists(IN user_name VARCHAR(10), IN db_name VARCHAR(10))
BEGIN
    DECLARE user_exists INT;

SELECT COUNT(*)
INTO user_exists
FROM mysql.user
WHERE user = user_name;

IF user_exists > 0 THEN
        SET @grant_query =
                CONCAT('GRANT ALL PRIVILEGES ON `', db_name, '`.* TO\'', user_name, '\'@\'', host_name, '\'');
PREPARE stmt FROM @grant_query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
FLUSH PRIVILEGES;
END IF;
END //

