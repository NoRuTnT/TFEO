CREATE DATABASE IF NOT EXISTS tfeo;
create schema IF NOT EXISTS tfeo.tfeo_test;
create schema IF NOT EXISTS tfeo.tfeo_temp;


CREATE USER 'tfeo'@'%' IDENTIFIED BY 'tfeo123';

GRANT ALL PRIVILEGES ON `tfeo_test`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_temp`.* TO 'tfeo'@'%';

FLUSH PRIVILEGES;
