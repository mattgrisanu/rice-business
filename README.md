# Business Service
Rice business provides and serves restaurant and rating information for Rice. 

## Table of Contents
1. [Getting started](#Getting-Started)
  1. Clone the latest version
  2. Install Dependencies
  3. Setup Environment Variables
  4. Start the application
2. [Setup Database](#database)
3. [Technologies] (#Technologies)
4. [Architecture](#Architecture)
5. [API Endpoints](#Endpoint)


## <a id="Getting-Started"></a> Getting Started
#### 1. Clone the latest version

  Start by cloning the latest version of rice-business on your local machine by running:

  ```sh
  $ git clone https://github.com/dadamaka/rice-business
  $ cd rice-business
  ```
  
#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```
  
#### 3. Setup Environment Variables

##### Server side setup

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Enter your desired ```PORT```
  
  
##### Yelp API

  1. Create a free account on https://www.yelp.com/developers/api_console and create your API Keys.
  2. Enter and save your consumer key and token in your ``` development.env ``` file.

#### 4. Run the application

1. Start the server by running the following command from the root directory:

    ```sh
    $ npm start
    ```
2. Your server is now live at ```http://localhost:PORT```

#### 5. Run tests

1. Run the follow command from the root directory to run database query tests.
    ```sh
    $ npm test
    ```
    
## <a id="database"></a>Setup Database
1. Start a mySQL server:

    ```
    $ mysql.server start
    Starting mySQL
      SUCCESS!
    ```
1. Sign into your mySQL server with in the terminal (if you do not know your password try not inputting a password):

    ```
    $ mysql -u root -p
    ```
2. Create a database, make sure its name is the same as what you specified earlier as ```APP_NAME```.

    ```
    mysql> CREATE DATABASE APP_NAME;
    ```
3. Open up the database:

    ```
    mysql> USE APP_NAME;
    ```
4. Create an account and specifiy privileges. Here, we will be creating an `DB_USER` account with the password `DB_PASSWORD`, with a connection to `localhost` and all access to the database, `APP_NAME`. 

    ```
    mysql> CREATE USER 'DB_USER'@'localhost' IDENTIFIED BY 'DB_PASSWORD';
    mysql> GRANT ALL PRIVILEGES ON APP_NAME.* TO 'DB_USER'@'localhost';
    ```
To see privileges on the account you've just created:

    ```
    mysql> SHOW GRANTS FOR 'DB_USER'@'localhost';
    ```
    
###Dropping the database

1. Run the following command from the root directory:

    ```sh
    $ npm run drop
    ```
    
## <a id="Technologies"></a>Technologies

##### Back end:
- Node
- Express

##### Database:
- Bookshelf/Knex
- MySQL
- 
##### API:
- Yelp

##### Testing:
- Mocha
- Chai


##### Deployment:
- AWS EC2
- AWS RDS
- Docker

## <a id="Architecture"></a>Architecture

### Directory Layout
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /server/                    # Server source code
│   ├── /config/                # Initial server config files
│   ├── /controllers/           # Controllers for database interaction
│   ├── /env/                   # Environment variables
│   ├── /models/                # Data models
│   ├── /routes/                # Routes for incoming GET and POST requests
│   ├── /lib/                   # Lib for util functions
│   └── /server.js              # Server-side startup script
├── /test/                      # Server and client side tests
│   ├── /test-data.js           # Holds seed & dummy data
│   ├── /test-server.js         # Server side tests
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .babelrc                    # Babel presets
└── .eslintrc                   # ESLint settings
```
## <a id="Endpoint"></a>Business Service API Endpoints

`GET` /api/business/info  
`GET` /api/business/review  
`POST` /api/business/review  
`GET` /api/business/detail  
`POST` /api/business/yelp  
  
***
  
###```GET``` /api/business/info

Objective: Get a specific Business profile

Input: 

```
{ 
    name: *string*  
}
```

Output:
 
```
{
  "id": 1,
  "business_id": "sunrise-coffee-las-vegas-3",
  "name": "Sunrise Coffee",
  "address": "3130 E Sunset Rd",
  "phone": "7024333304",
  "city": "Las Vegas",
  "state": "NV",
  "latitude": "36.0718727111816",
  "longitude": "-115.106788635254",
  "rating": 4.5,
  "review_count": 759,
  "is_closed": "0",
  "created_at": "2016-07-02T09:10:58.000Z",
  "updated_at": "2016-07-02T09:10:58.000Z"
}
```

###`GET` /api/business/review 

Objective: Get all reviews of a specific Business

Input: 

```
{ 
    business_id: *string*
}
```

Output:
 
```
[
  {
    "id": 10,
    "business_id": "the-beat-coffeehouse-and-records-las-vegas",
    "user_id": "google-oauth2|109741962026347685714",
    "review": "",
    "rating": 0,
    "created_at": "2016-07-04T15:39:07.000Z",
    "updated_at": "2016-07-04T15:39:07.000Z"
  },
```

###`POST` /api/business/review  

Objective: Add a review and rating to database for a specific Business

Input:

```
  {
    clientId: *string*
    business_id:  *string*
    rating: *float*
    review: *string*  
  }
```

Output:
 
```'Add success'```

  
###`GET` /api/business/detail  

Objective: Get all details of a specific Business 

Input: 

```
{ 
    business_id: *string*  
}
```

Output:
 
```
[
  {
    "id": 4,
    "business_id": "the-beat-coffeehouse-and-records-las-vegas",
    "type": "category",
    "value": "coffee",
    "created_at": "2016-07-02T09:10:58.000Z",
    "updated_at": "2016-07-02T09:10:58.000Z"
  },
]
```

###`POST` /api/business/yelp 

Objective: Pull more information from Yelp on recommended Business

Input: 

```
{ 
    response: [{
      cuisine: "cafes",
      id: "unlessstring",
      name: "The Beat Coffeehouse & Records",
      rating: 0.20202,
      userRated: false
    },
    {
      cuisine: "french",
      id: "unlessstring",
      name: "Sunrise Coffee",
      rating: 0.20202,
      userRated: false
    }]
  }
```

Output:
 
```'Add Business sucessful!'```

