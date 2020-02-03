create database to_do;
use to_do;

create table tb_user(
	  id_user int not null auto_increment,
    name_user varchar(80) not null,
    login_user varchar(30) not null,
    email_user varchar(80) not null,
    password_user varchar(16) not null,
    
    constraint pk_user
		primary key(id_user)		
);

create table tb_task(
	  id_task int not null auto_increment,
    name_task varchar(80) not null,
    description_task varchar(255) not null,
    finished_task bool default false,
    id_user int,
    
    constraint pk_task
		primary key(id_task),
  	constraint fk_task_user
		foreign key(id_user)
			references tb_user(id_user)
);