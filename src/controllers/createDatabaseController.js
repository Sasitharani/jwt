import db from '../../db.js'; // Ensure the correct path

const createDatabase = (req, res) => {
  const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS IITI';

  db.query(createDatabaseQuery, (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      return res.status(500).json({ error: 'Error creating database' });
    }
    res.status(200).json({ message: 'Database created successfully' });
  });
};

export { createDatabase };
