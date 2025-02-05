import db from '../../db.js'; // Ensure the correct path

const createUserSessionDB = (req, res) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  const tableName = `todaysDateLikes_${formattedDate}`;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      SrNo INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      MaxLikes INT DEFAULT 10,
      LikesUsed INT DEFAULT 0,
      LikesAvailable INT DEFAULT 10,
      MaxImages INT DEFAULT 0,
      ImagesUploaded INT DEFAULT 0,
      Membership VARCHAR(50),
      lastSpinTime TIME,
      timeDiff BIGINT,  // Add timeDiff column
      CHECK (MaxLikes = LikesAvailable)
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).json({ error: 'Error creating table' });
    }
    res.status(200).json({ message: 'Table created successfully' });
  });
};

export { createUserSessionDB };













