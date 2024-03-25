# JAWABAN Exercise 5 - SQL Syntax

```sql
-- Create db name as purwadhika*student, purwadhika_schedule, purwadhika_branch
create database purwadhika_student;
create database purwadhika_schedule;
create database purwadhika_branch;

-- Show list of database with name contain purwadhika.
show databases like '%purwadhika%';

-- Delete database purwadhika_schedule
drop database purwadhika_schedule;

-- Create table name as Students in purwadhika_student db, with field id, last_name, first_name, address, city. The id field should be in integer type while the rest is varchar.
use purwadhika_student;
create table students (
id int(10) primary key auto_increment not null,
last_name varchar(100),
first_name varchar(100),
address varchar(255),
city varchar(100)
);

-- Add email column into table Students with type varchar.
alter table students
add email varchar(100);

-- Add gender, batch_code, phone_number, alternative_phone_number column in single query.
alter table students
add gender enum('male', 'female'),
add batch_code varchar(20),
add phone_number varchar(40),
add alternative_phone_number varchar(40);

-- Change alternative_phone_number column name into description with varchar type.
alter table students change column alternative_phone_number description varchar(255);

-- alter table students add description varchar(255);
-- Remove column gender in table Students
alter table students drop gender;

-- create table branch
use purwadhika_branch;
create table branches (
id int(10) primary key auto_increment not null,
branch_name varchar(100),
pic varchar(30),
address varchar(100),
city varchar(100),
province varchar(100)
);

select *
from branches;
insert into branches (branch_name, pic, address, city, province)
values ('BSD','THOMAS',"green office park 9","BSD","Tangerang"),
(
'JKT',
"Budi",
"MSIG Tower",
"Jakarta Selatan",
"DKI Jakarta"
),
('BTM', "ANGEL", "Nongsa", "Batam", "Kep. Riau");

update branches
set pic = 'Dono'
where city = 'BSD';

alter table branches
modify column branch_name char(3);

insert into branches (branch_name, pic, address, city, province)
values ('BLI', 'Tono', "Gianyar", "Gianyar", "Bali");

-- sakila db
use sakila;

-- Display the first and last names of all actors from the table actor.
select first_name,
last_name
from actor;

-- You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select actor_id,
first_name,
last_name
from actor
where first_name = 'Joe';

-- Display the address, district, and city_id from address only for district: California, Alberta and Mekka
select ad.address,
ad.district,
city_id
from address ad
where district in ('California', 'Alberta', "Mekka");

-- Count actor with last name WOOD from table actors.
select count(last_name) as total_actor
from actor
where last_name = 'Wood';
select _
from actor
where last_name = 'Wood';

-- Shows list of customer_id and sum of amount spent that made payment more than 20.
select customer_id,
sum(amount) as total
from payment
group by customer_id
having total > 20;

-- Add new actor into table actors with name JHONNY DAVIS.
insert into actor (first_name, last_name)
values ('Jhonny', 'Davis');

insert into actor (first_name, last_name)
values ('Adam', 'Davis'),
("Jeremy", "Davis"),
("Craig", "Davis"),
("Steve", "Davis")
```
