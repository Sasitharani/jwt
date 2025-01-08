import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../db"; // Ensure the correct path

const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

const googleLogin = async (req, res) => {
  console.log("Google Login hit");
  const { email, name } = req.body;
  try {
    const query = 'SELECT * FROM userdb WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Google login failed. Please try again.');
        return;
      }
      let user = results[0];

      if (!user) {
        // If user does not exist, create a new user
        const query = `
          INSERT INTO userdb (username, email)
          VALUES (?, ?)
        `;
        const values = [name, email];
        db.query(query, values, (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Google login failed. Please try again.');
            return;
          }
          user = { id: results.insertId, username: name, email };
        });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).send('Error logging in with Google');
  }
};

export { googleLogin };
