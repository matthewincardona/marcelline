DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users 
(
    UserId INTEGER PRIMARY KEY, 
    UserName TEXT, 
    UserCounter INTEGER
);
INSERT INTO Users (UserID, UserName, UserCounter) VALUES (1, 'Marcel', 0), (2, 'Matthew', 0);