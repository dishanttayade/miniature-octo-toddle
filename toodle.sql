DROP DATABASE `toddle`;
CREATE DATABASE  IF NOT EXISTS `toddle`;
USE `toddle`;

-- DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL UNIQUE,
  `password` varchar(300) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- DROP TABLE IF EXISTS `class`;
CREATE TABLE IF NOT EXISTS `class`(
	`id` int NOT NULL AUTO_INCREMENT,
    `ownerid` int NOT NULL,
	`name` varchar(40) DEFAULT NULL,
	`description` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `filelist`(
	`id` int NOT NULL AUTO_INCREMENT,
    `classid` int NOT NULL,
	`filename` varchar(50) NOT NULL,
    `link` varchar(500) DEFAULT NULL,
	`type` varchar(10) DEFAULT NULL,
    `uploadedtime` datetime,
    `uploadedbyid` int NOT NULL,
    `description` varchar(200),
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `students`(
	`classid` int NOT NULL,
	`studentid` int NOT NULL
);

INSERT INTO users(id,name,email,password,type) VALUES (1,'Dishant Tayade','dishanttayade1@gmail.com','$2b$10$Lm.16qLzAh19oj.V8SI73OuxrSBGNdUH6y8mwSXIWxhn9D6dnCk7.','tutor');
INSERT INTO users(id,name,email,password,type) VALUES (2,'Dishant Tayade1','dishanttayade11@gmail.com','$2b$10$Lm.16qLzAh19oj.V8SI73OuxrSBGNdUH6y8mwSXIWxhn9D6dnCk7.','student');
INSERT INTO users(id,name,email,password,type) VALUES (3,'someonenew121','someonew1@gmail.com','$2b$10$uRvvDs//EWFguPGKB.kLpubi5qKxFmYbm3KKDnRhktfQRyi3wq55i','student');
INSERT INTO users(id,name,email,password,type) VALUES (4,'somestudentttt','somestud112@gmail.com','password','student');
INSERT INTO users(id,name,email,password,type) VALUES (5,'sometutor','sometutor@gmail.com','$2b$10$P0TVsVfVKnRSwDZP5hyezObmcsABadOxQhW6czhe8OJ1zrZRLtinS','tutor');
INSERT INTO users(id,name,email,password,type) VALUES (6,'somestudentttt','somestd1@gmail.com','$2b$10$khdyrg4Y1h.WMyxYOXU7EeUPdFP//tUd45fb/EL7/yvELm6vVNAfC','student');
INSERT INTO users(id,name,email,password,type) VALUES (8,'somestd','sl.com','$2b$10$ERvxeoR7nX.bzFryQCPuC.1/TCTU34bfXbgqwXbRwoflyLc1qIm8G','student');
INSERT INTO users(id,name,email,password,type) VALUES (9,'somenewstudent','newstudent@gmail.com','$2b$10$nzYDZvQrsdAySrLUVdqYvO387AB6agKJCUOG2ITavHK4.wkcgzTvG','student');

INSERT INTO class(id,ownerid,name,description) VALUES (1,1,'First','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (2,1,'Second','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (3,1,'Third','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (4,5,'Fourth','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (5,5,'Fifth','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (6,5,'Sixth','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (7,5,'Seventh','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (8,5,'Eighth','First class from SQL file');
INSERT INTO class(id,ownerid,name,description) VALUES (9,5,'Ninth','First class from SQL file');

INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (1,1,'hellothere1','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (2,1,'program file.png','https://dishantsawsbucket.s3.amazonaws.com/program%20file.png','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (3,1,'program file.png','https://dishantsawsbucket.s3.amazonaws.com/program%20file.png','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (4,1,'controlpanel1.png','https://dishantsawsbucket.s3.ap-south-1.amazonaws.com/controlpanel1.png','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (5,1,'Resume-Dishant_Tayade.pdf','https://dishantsawsbucket.s3.ap-south-1.amazonaws.com/Resume-Dishant_Tayade.pdf','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (6,1,'Screenshot 2022-09-09 012702.png','https://dishantsawsbucket.s3.amazonaws.com/Screenshot%202022-09-09%20012702.png','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (7,1,'somename','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (8,1,'somename','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80','IMAGE',now(),1,'HELLLLO THEREEEEEEEEEEEEEEEEEEEE');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (9,1,'somename','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80','IMAGE',now(),1,'HIIIIIIII');
INSERT INTO filelist(id,classid,filename,link,type,uploadedtime,uploadedbyid,description) VALUES (10,1,'somename','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80','IMAGE',now(),1,'HIIIIIIIIIIIIIIIIIIIIII');

INSERT INTO students(classid,studentid) VALUES (1,2);
INSERT INTO students(classid,studentid) VALUES (1,3);
INSERT INTO students(classid,studentid) VALUES (1,4);
INSERT INTO students(classid,studentid) VALUES (4,3);
INSERT INTO students(classid,studentid) VALUES (4,4);
INSERT INTO students(classid,studentid) VALUES (4,6);
INSERT INTO students(classid,studentid) VALUES (4,7);
INSERT INTO students(classid,studentid) VALUES (2,3);
INSERT INTO students(classid,studentid) VALUES (2,4);