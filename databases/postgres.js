import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const connection = new Pool({
  user: process.env.USER_PG,
  password: process.env.PASSWORD_PG,
  host: process.env.HOST_PG,
  port: process.env.PORT_PG,
  database: process.env.DATABASE_PG
});

export default connection;