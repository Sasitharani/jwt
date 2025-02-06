import db from '../../db.js';

export const spinWheelLike = (req, res) => {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const tableName = `todaysDateLikes_${today}`;
  let { email, result, lastSpinTime, timeDiff } = req.body; // Get lastSpinTime from API call

  console.log('spinwheel called');
  console.log('Table name:', tableName);
  console.log('Received email:', email);
  console.log('Last spin time:', lastSpinTime);

  const selectQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
  db.query(selectQuery, [email], (err, selectResults) => {
    if (err) {
      console.error('Error selecting data:', err);
      res.status(500).send('Error in fetching your data. Contact technical support team.');
      return;
    }

    if (selectResults.length > 0) {
      let likesUsed = selectResults[0].LikesUsed;
      let maxLikes = selectResults[0].maxLikes;
      let likesAvailable = selectResults[0].LikesAvailable;

      let updatedLikesAvailable = likesAvailable + result;
      let updatedMaxLikes = updatedLikesAvailable;

      console.log('Updated last spin time:', lastSpinTime);

      const updateQuery = `UPDATE ${tableName} SET LikesAvailable = ?, maxLikes = ?, lastSpinTime = ?, timeDiff = ? WHERE email = ?`;
      db.query(updateQuery, [updatedLikesAvailable, updatedMaxLikes, lastSpinTime, timeDiff, email], (err, updateResults) => {
        if (err) {
          console.error('Error updating data:', err);
          res.status(500).send('Error in updating your data. Contact technical support team.');
          return;
        }

        const now = new Date();
        const timeDiff = (new Date(lastSpinTime).getTime() + 30 * 60 * 1000) - now.getTime(); // 30 minutes

        res.status(200).json({ message: 'Likes updated successfully', maxLikes: maxLikes, timeDiff: timeDiff });
      });
    } else {
      res.status(404).send('Email not found');
    }
  });
};
