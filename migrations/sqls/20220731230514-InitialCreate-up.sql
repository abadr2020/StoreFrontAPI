Create type order_status As ENUM ('Active','Completed');

CREATE TABLE roles(
    id serial primary key,
    rolename varchar(100) not null UNIQUE
);

CREATE TABLE users(
    id serial primary key,
    firstname varchar(100) not null,
    lastname varchar(100) not null,
    username varchar(255) not null UNIQUE,
    password varchar(255) not null,
    roleid integer references Roles(id) not null
);

CREATE TABLE categories(
    id serial primary key,
    categoryname varchar(100) not null UNIQUE
);

CREATE TABLE products(
    id serial primary key,
    productname varchar(100) not null,
    price decimal not null,
    categoryid integer references Categories(id) not null
);

CREATE TABLE orders(
    id serial primary key,
    orderstatus order_status default 'Active',
    userid integer references users(id) not null
);

Create Table orders_products(
    orderid integer references orders(id) ON delete cascade not null,
    productid integer references products(id) ON delete cascade not null,
    qty integer not null
);



