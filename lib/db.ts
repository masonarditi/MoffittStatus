import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

/* eslint-disable no-var */
declare global {
  var _connection: mysql.Pool | undefined;
}
/* eslint-enable no-var */

const connection: mysql.Pool = global._connection || mysql.createPool({
  uri: process.env.JAWSDB_URL || "mysql://kqydyq0eznrb573j:c4ums7k6uohxb5ua@q68u8b2buodpme2n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/a8ii54ul8zyr1yt1",
  connectionLimit: 12,
});

global._connection = connection;

export default connection;
