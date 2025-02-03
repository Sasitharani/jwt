import db from '../../db.js';

export const spinWheelLike = (req, res) => {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const tableName = `todaysDateLikes_${today}`;
  let { email, result } = req.body;

  console.log('spinwheel called');
  console.log('Table name:', tableName);
  console.log('Received email:', email);

  const selectQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
  db.query(selectQuery, [email], (err, selectResults) => {
    if (err) {
      console.error('Error selecting data:', err);
      res.status(500).send('Error in fetching your data. Contact technical support team.');
      return;
    }

    if (selectResults.length > 0) {
      let likesUsed = selectResults[0].LikesUsed;
      let maxLikes = likesUsed + result;

      const updateQuery = `UPDATE ${tableName} SET LikesAvailable = ? WHERE email = ?`;
      db.query(updateQuery, [maxLikes, email], (err, updateResults) => {
        if (err) {
          console.error('Error updating data:', err);
          res.status(500).send('Error in updating your data. Contact technical support team.');
          return;
        }

        res.status(200).json({ message: 'Likes updated successfully', maxLikes: maxLikes });
      });
    } else {
      res.status(404).send('Email not found');
    }
  });
};
