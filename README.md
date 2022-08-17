# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Setup

### Application port number

3500

### DB port number

Defualt port: 5432

### Commands to setup DB
On pg cli:

CREATE USER store_front_api WITH PASSWORD 'Pass159';

CREATE DATABASE store_front;

CREATE DATABASE store_front_test;

\c store_front

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO store_front_api;

\c store_front_test

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO store_front_api;

GRANT ALL PRIVILEGES ON DATABASE store_front TO store_front_api;

GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_front_api;

Then run 'npm run db:up' script

Then run 'npm run db:seed' script

Now an admin user created with the following data:

usernme: admin
password: P@ssword
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4

db-migrate and nodemon should be installed globally

Then we could run 'npm run start' script

We can add new roles, categories, products, register new users and create orders all using endpoints.

Or 'npm run test' script for test.

### Environment Variables 

POSTGRES_HOST=localhost
POSTGRES_DB=store_front
POSTGRES_DB_TEST=store_front_test
POSTGRES_USER=store_front_api
POSTGRES_PASSWORD=Pass159
Node_ENV=dev
SALT_ROUNDS=2
PEPPER=secret-key
JWT_SECRET=jwt-secret-key

### Install Dependencies

Run 'npm run install'

## Dependencies

    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jasmine": "^4.2.1",
    "jasmine-spec-reporter": "^7.0.0",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.7.3",
    "supertest": "^6.2.4"

## Dev Dependencies

    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.13",
    "@types/jasmine": "^4.0.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/node": "^18.0.4",
    "@types/pg": "^8.6.5",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.30.7",
    "@typescript-eslint/parser": "^5.30.7",
    "eslint": "^8.19.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "prettier": "^2.7.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"

## Scripts

"scripts": {
    "start":"node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "npx tsc",
    "db:up": "db-migrate up",
    "db:down": "db-migrate reset",
    "db:up-dev": "db-migrate up --env test",
    "db:down-dev": "db-migrate reset --env test",
    "db:seed": "npm run build&&node dist/utils/seeders/db.seeder.js",
    "prettier": "prettier --config .prettierrc \"src/**/*.ts\" --write",
    "eslint": "eslint . --ext .ts",
    "test": " npm run build&&set Node_ENV=test&&db-migrate --env test up&&node dist/utils/seeders/db.seeder.js&&jasmine&&db-migrate --env test reset",
    "jasmine": "jasmine"
  }
  
