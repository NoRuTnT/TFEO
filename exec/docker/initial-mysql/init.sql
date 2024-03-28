DROP USER IF EXISTS 'tfeo'@'%';
CREATE USER 'tfeo'@'%' IDENTIFIED BY 'tfeo123';
GRANT CREATE ON *.* TO 'tfeo'@'%';

CREATE DATABASE IF NOT EXISTS tfeo;
CREATE DATABASE IF NOT EXISTS tfeo_test;
CREATE DATABASE IF NOT EXISTS tfeo_temp;



GRANT ALL PRIVILEGES ON `tfeo`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_test`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_temp`.* TO 'tfeo'@'%';

FLUSH PRIVILEGES;

-- create schema


create table activity (
      activity_no bigint not null auto_increment,
      activity_image_url varchar(255),
      activity_text varchar(255),
      approve varchar(255),
      created_at datetime(6),
      expired_at date,
      start_at date,
      week varchar(255),
      contract_no bigint,
      primary key (activity_no)
) engine=InnoDB;

create table contract (
      contract_no bigint not null auto_increment,
      contract_url varchar(255),
      created_at datetime(6),
      expired_at date,
      host_sign bit,
      progress varchar(255),
      start_at date,
      student_sign bit,
      home_no bigint,
      member_no bigint,
      primary key (contract_no)
) engine=InnoDB;

create table home (
      home_no bigint not null auto_increment,
      detail varchar(255),
      emd varchar(255),
      ro varchar(255),
      sgg varchar(255),
      si varchar(255),
      guardian_name varchar(255),
      guardian_phone varchar(255),
      host_account_no varchar(255),
      host_age integer not null,
      host_bank varchar(255),
      host_gender varchar(255),
      host_name varchar(255),
      host_phone varchar(255),
      host_register_no varchar(255),
      introduce varchar(255),
      lat double precision,
      lng double precision,
      register_member_role varchar(255),
      relation varchar(255),
      rent integer not null,
      home_option_no bigint,
      host_personality_no bigint,
      primary key (home_no)
) engine=InnoDB;

create table home_image (

        home_image_no bigint not null auto_increment,
        home_image_url varchar(255),
        home_no bigint,
        primary key (home_image_no)
) engine=InnoDB;

create table home_option (
     home_option_no bigint not null auto_increment,
     air_conditioner bit,
     breakfast bit,
     elevator bit,
     gas bit,
     heating bit,
     internet bit,
     microwave bit,
     move_in_date bit,
     parking bit,
     refrigerator bit,
     sink bit,
     station bit,
     toilet bit,
     type integer,
     washing_machine bit,
     primary key (home_option_no)
) engine=InnoDB;

create table host_image (
        host_image_no bigint not null auto_increment,
        host_image_url varchar(255),
        home_no bigint,
        primary key (host_image_no)
) engine=InnoDB;

create table host_personality (
      host_personality_no bigint not null auto_increment,
      clean bit,
      cold bit,
      daytime bit,
      extrovert bit,
      hot bit,
      introvert bit,
      nighttime bit,
      no_touch bit,
      pet bit,
      smoke bit,
      primary key (host_personality_no)
) engine=InnoDB;

create table member (
        member_no bigint not null auto_increment,
        detail varchar(255),
        emd varchar(255),
        ro varchar(255),
        sgg varchar(255),
        si varchar(255),
        certificate varchar(255),
        certificate_expiration_date date,
        certificate_register_date date,
        certificate_status varchar(255),
        college varchar(255),
        email varchar(255),
        gender varchar(255),
        lat double precision,
        lng double precision,
        name varchar(255),
        phone varchar(255),
        profile_url varchar(255),
        register_no varchar(255),
        return_at time,
        role varchar(255),
        sleep_at time,
        social_id varchar(255),
        social_type varchar(255),
        wake_at time,
        member_personality_no bigint,
        primary key (member_no)
) engine=InnoDB;

create table member_personality (
        member_personality_no bigint not null auto_increment,
        cold bit,
        daytime bit,
        dinner bit,
        drink bit,
        electronics bit,
        errand bit,
        fast bit,
        host_house_prefer integer,
        hot bit,
        housework bit,
        inside bit,
        late bit,
        live_long bit,
        live_short bit,
        nighttime bit,
        outside bit,
        pet bit,
        quiet bit,
        smoke bit,
        strong bit,
        primary key (member_personality_no)
) engine=InnoDB;

create table review (
        review_no bigint not null auto_increment,
        created_at datetime(6),
        updated_at datetime(6),
        home_content varchar(255),
        home_no bigint,
        member_no bigint,
        review_keyword_no bigint,
        primary key (review_no)
) engine=InnoDB;

create table review_keyword (
        review_keyword_no bigint not null auto_increment,
        affordable_rent bit,
        clean_house bit,
        convenient_transportation bit,
        easy_access_to_home bit,
        good_security bit,
        kind_elderly bit,
        many_nearby_amenities bit,
        matches_stated_options bit,
        near_school bit,
        respectful_elderly bit,
        spacious_room bit,
        primary key (review_keyword_no)
) engine=InnoDB;

create table wish (
      wish_no bigint not null auto_increment,
      created_at datetime(6),
      updated_at datetime(6),
      home_no bigint,
      member_no bigint,
      primary key (wish_no)
) engine=InnoDB;

alter table activity
    add constraint FKiadvtcpwldx8m8vrxcig6y56y
        foreign key (contract_no)
            references contract (contract_no);

alter table contract
    add constraint FKc6rfi8tdlp21crca5jnh0dw7o
        foreign key (home_no)
            references home (home_no);

alter table contract
    add constraint FK8uh81n7p4q4fb69tjdin7pjxl
        foreign key (member_no)
            references member (member_no);

alter table home
    add constraint FKg5s8t95on0413383wr44u2kse
        foreign key (home_option_no)
            references home_option (home_option_no);

alter table home
    add constraint FKeb8ijo2dok3ku51sk4nnwdcex
        foreign key (host_personality_no)
            references host_personality (host_personality_no);

alter table home_image
    add constraint FKj1o8igw6393tkj65wjbm5fpya
        foreign key (home_no)
            references home (home_no);

alter table host_image
    add constraint FKqc7fjsu7djgefj39jcl7466wo
        foreign key (home_no)
            references home (home_no);

alter table member
    add constraint FKi7es9n6n5p2q6q57v2ikpdt6k
        foreign key (member_personality_no)
            references member_personality (member_personality_no);

alter table review
    add constraint FK7pkl49g6wqq99d7k3oktflvds
        foreign key (home_no)
            references home (home_no);

alter table review
    add constraint FKo1ld155nbvjqtwhx4ggscrik2
        foreign key (member_no)
            references member (member_no);

alter table review
    add constraint FKijfiimogh3aj5l28xk5skavlj
        foreign key (review_keyword_no)
            references review_keyword (review_keyword_no);

alter table wish
    add constraint FKtnpmkb3wlu4oqkiceocsx3viv
        foreign key (home_no)
            references home (home_no);

alter table wish
    add constraint FKh9vnewqovnu4ffblil3ht5mht
        foreign key (member_no)
            references member (member_no);


LOAD DATA INFILE '/tmp/home.csv'
INTO TABLE home
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/tmp/home_image.csv'
INTO TABLE home_image
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/tmp/home_option.csv'
INTO TABLE home_option
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/tmp/host_image.csv'
INTO TABLE host_image
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/tmp/host_personality.csv'
INTO TABLE home_personality
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

