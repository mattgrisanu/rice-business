# Business Service

### Server-side setup

#### 1. Setup Environment Variables

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Enter your desired ```APP_NAME``` (this will your mysql database name)
  3. Replace the ```PORT``` with your desired port and enter the login credentials for your MySQL server (make sure it is running)

#### 2. Setup dependencies

1. Install dependencies by running the following command from the root directory:

  ```
  $ npm install
  ```

#### 3. Setup database

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
2. Create a database, make sure its name is the same as what you specified earlier as ```APP_NAME```. For more information, visit this [great tutorial](https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial):

    ```
    mysql> CREATE DATABASE APP_NAME;
    ```
3. Open up the database:

    ```
    mysql> USE APP_NAME;
    ```
4. Create an account and specifiy privileges. Here, we will be creating an `DB_USER` account with the password `DB_PASSWORD`, with a connection to `localhost` and all access to the database, `APP_NAME`. More information about users and privileges can be found [here](http://dev.mysql.com/doc/refman/5.7/en/adding-users.html "mysql Docs") and [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql "Digital Ocean's How-to")

    ```
    mysql> CREATE USER 'DB_USER'@'localhost' IDENTIFIED BY 'DB_PASSWORD';
    mysql> GRANT ALL PRIVILEGES ON APP_NAME.* TO 'DB_USER'@'localhost';
    ```
To see privileges on the account you've just created:

    ```
    mysql> SHOW GRANTS FOR 'DB_USER'@'localhost';
    ```
    
#### 4. Start server

1. Start the server by running the following command from the root directory:

    ```
    $ npm start
    ```
2. Your server is now live at ```http://localhost:PORT```

### Seeding database

1. In the `development.env` file specific the path to the directory where the CSV data files are.
2. Change the file names on line 9 and 10 in `seed.js` to match the CSV data file names.
3. Run `seed.js` with the following command from `server/`:

  ```
  $ node seed.js
  ```