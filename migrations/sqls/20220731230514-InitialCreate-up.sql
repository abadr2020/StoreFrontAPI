Create type Order_Status As ENUM ('Active','Completed');

CREATE TABLE Roles(
    Id serial primary key,
    RoleName varchar(100) not null UNIQUE
);

CREATE TABLE Users(
    Id serial primary key,
    FirstName varchar(100) not null,
    LastName varchar(100) not null,
    UserName varchar(255) not null UNIQUE,
    Password varchar(255) not null,
    RoleId integer references Roles(Id) not null
);

CREATE TABLE Categories(
    Id serial primary key,
    CategoryName varchar(100) not null UNIQUE
);

CREATE TABLE Products(
    Id serial primary key,
    ProductName varchar(100) not null,
    Price decimal not null,
    CategoryId integer references Categories(Id) not null
);

CREATE TABLE Orders(
    Id serial primary key,
    OrderStatus Order_Status default 'Active',
    UserId integer references Users(Id) not null
);

Create Table ORders_Products(
    OrderId integer references Orders(Id) not null,
    ProductId integer references Products(Id) not null,
    Qty integer not null
);



