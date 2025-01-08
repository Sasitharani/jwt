import db from '../../db.js'; // Ensure the correct path

const checkEmailAvailability = (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM userdb WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error checking email. Please try again.');
      return;
    }
    if (results.length > 0) {
      res.status(200).send({ available: false });
    } else {
      res.status(200).send({ available: true });
    }
  });
};

export { checkEmailAvailability };
