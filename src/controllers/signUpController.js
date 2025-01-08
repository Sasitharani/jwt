import bcrypt from 'bcryptjs';
import db from '../../db.js'; // Ensure the correct path

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO userdb (username, password, email)
      VALUES (?, ?, ?)
    `;
    const values = [username, hashedPassword, email];
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Signup failed. Please try again.');
        return;
      }
      res.status(200).send({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

export { signup };
