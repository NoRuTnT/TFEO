DROP USER IF EXISTS 'tfeo'@'%';
CREATE USER 'tfeo'@'%' IDENTIFIED BY 'tfeo123';
GRANT CREATE ON *.* TO 'tfeo'@'%';

CREATE DATABASE IF NOT EXISTS tfeo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS tfeo_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS tfeo_temp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


GRANT ALL PRIVILEGES ON `tfeo`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_test`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_temp`.* TO 'tfeo'@'%';

FLUSH PRIVILEGES;

-- create schema

USE tfeo;