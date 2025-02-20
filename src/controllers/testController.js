import pkg from 'pg';
const { Pool } = pkg;
import Swal from 'sweetalert2';
import db from '../../db.js'; // Import the MySQL connection pool

const pool = new Pool({
  connectionString: 'postgresql://sasi:607IcvNlYDph26KBGYgDqYQ8lZTCf3Hi@dpg-cupebiq3esus738d0ee0-a/contest'
});

export const connectToDatabase = async (req, res) => {
  console.log('connectToDatabase function hit');
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS test_table (
        SrNo SERIAL PRIMARY KEY,
        Name VARCHAR(100) NOT NULL
      );
    `;
    await client.query(createTableQuery);
    client.release();
    res.status(200).send('Connected to PostgreSQL and table created');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    res.status(500).send('Failed to connect to PostgreSQL');
  }
};

export const showDatabaseTables = async (req, res) => {
  console.log('showDatabaseTables function hit');
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    console.log('Query executed successfully');
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching tables from PostgreSQL:', err);
    res.status(500).json({ error: 'Failed to fetch tables from PostgreSQL', details: err.message });
  }
};

export const connectToVercelDatabase = async (req, res) => {
  console.log('connectToVercelDatabase function hit');
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to Vercel database:', err);
      res.status(500).send('Failed to connect to Vercel database');
      return;
    }
    console.log('Connected to Vercel database');
    connection.release();
    res.status(200).send('Connected to Vercel database');
  });
};
