# Business Service

### Server-side setup

#### 1. Setup Environment Variables

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Enter your desired ```PORT```

#### 2. Setup dependencies

1. Install dependencies by running the following command from the root directory:

	```
	$ npm install
	```
    
#### 3. Start server

1. Start the server by running the following command from the root directory:

    ```
    $ npm start
    ```
2. Your server is now live at ```http://localhost:PORT```

### Dropping the database

1. Run the following command from the root directory:

    ```
    $ npm run drop
    ```
### Testing

1. Run the follow command from the root directory to run database query tests.
    ```
    $ npm test
    ```
