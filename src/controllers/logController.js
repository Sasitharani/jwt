import db from '../../db.js'; // Ensure the correct path

const deleteAllLogs = (req, res) => {
  const query = 'DELETE FROM logs';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error deleting logs:', err);
      return res.status(500).send('Error deleting logs');
    }
    res.status(200).send({ message: 'All logs deleted successfully' });
  });
};

export { deleteAllLogs };
