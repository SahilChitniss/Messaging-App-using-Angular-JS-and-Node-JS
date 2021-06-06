
/*drop table users;
drop table groups;
drop table members;
drop table groupMembers;
drop table msgSourceStore;
drop table msgSinkStore;
drop table msgAttachments;
drop table memberLabels;
drop table memberLabelGroups;
drop table memberMsgLabels;
*/
/*
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE temp(	
ID INT PRIMARY KEY NOT NULL,
DEPT CHAR(50) NOT NULL
);
INSERT INTO "temp" VALUES(1,'cs');*/
CREATE TABLE users(
sysuserid INTEGER PRIMARY KEY AUTO_INCREMENT NULL, 
userid INTEGER NOT NULL,
username varchar(100) NOT NULL,
pass	varchar(100) NOT NULL, 
dob date NOT NULL,
email varchar(50) NOT NULL
);

INSERT INTO users VALUES(1,-1,'Unk','Unk','-1/-1/-1','Unk');

CREATE TABLE groups(
sysgroupid INTEGER PRIMARY KEY AUTO_INCREMENT,
groupid INTEGER NOT NULL,
groupname varchar(20) NOT NULL
);
INSERT INTO groups VALUES(1,-1,'Unk');
CREATE TABLE members(
memberid INTEGER PRIMARY KEY AUTO_INCREMENT,
UserorGroupid INTEGER NOT NULL);
INSERT INTO members VALUES(1,-1);
CREATE TABLE groupMembers(
groupid INTEGER NOT NULL,
memberid INTEGER NOT NULL,
access_id INTEGER NOT NULL,
FOREIGN KEY(groupid) references groups(sysgroupid),
FOREIGN KEY(memberid) references members(memberid),
FOREIGN KEY(access_id) references accessRights(access_id));
INSERT INTO groupMembers VALUES(1,1,1);

CREATE TABLE msgSourceStore (
userid INTEGER NOT NULL,
msgid INTEGER PRIMARY KEY AUTO_INCREMENT,
msgtext varchar(200) NOT NULL,
msgTimestamp BLOB  NULL,
msgStatus char(10) NOT NULL,
Foreign Key (userid) references users(userid));




INSERT INTO msgSourceStore VALUES(1,1,'Unk',-1,'Unk');


CREATE TABLE msgSinkStore (
userid INTEGER NOT NULL,
msgid INTEGER,
msgtext varchar(200) NOT NULL,
msgTimestamp BLOB NULL,
Foreign Key (userid) references users(userid),
Foreign Key (msgid) references msgSourceStore(msgid)
);



INSERT INTO msgSinkStore VALUES(1,1,'Unk',-1);
CREATE TABLE msgAttachments(
msgid INTEGER NOT NULL,
atchid INTEGER PRIMARY KEY AUTO_INCREMENT,
atchname varchar(20) NOT NULL,
atchblob blob NOT NULL,
Foreign Key (msgid) references msgSourceStore(msgid)
);
INSERT INTO msgAttachments VALUES(1,1,'Unk','Unknown
');
CREATE TABLE memberLabels (
memberid INTEGER NOT NULL,
Label INTEGER PRIMARY KEY AUTO_INCREMENT,
Label_DESC varchar(50),
Foreign Key (memberid) references members(memberid)
);
INSERT INTO memberLabels VALUES(1,1,'Unknown');
CREATE TABLE memberLabelGroups (
memberid INTEGER NOT NULL,
Label INTEGER NOT NULL,
parentLabel INTEGER NOT NULL,
Foreign Key (memberid) references members(memberid),
Foreign Key (Label) references membersLabel(Laebl),
Foreign Key (parentLabel) references memberLabel(Label)
);
INSERT INTO memberLabelGroups VALUES(1,1,1);
CREATE TABLE memberMsgLabels (
memberid INTEGER NOT NULL,
msgid INTEGER NOT NULL,
Label INTEGER NOT NULL,
Foreign Key (memberid) references members(memberid),
Foreign Key (msgid) references messages(msgid)
Foreign Key (Label) references membersLabel(Label)
);
INSERT INTO memberMsgLabels VALUES(1,1,1);
/*DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('users',1);
INSERT INTO "sqlite_sequence" VALUES('groups',1);
INSERT INTO "sqlite_sequence" VALUES('members',1);
INSERT INTO "sqlite_sequence" VALUES('msgSourceStore',1);
INSERT INTO "sqlite_sequence" VALUES('msgAttachments',1);
INSERT INTO "sqlite_sequence" VALUES('memberLabels',1);
COMMIT;
*/
