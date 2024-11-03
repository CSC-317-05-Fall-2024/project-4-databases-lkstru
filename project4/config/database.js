import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log('Database URL:', process.env.DATABASE_URL);

const config = {
  connectionString: process.env.DATABASE_URL,
};

export const pool = new pg.Pool(config);
