import db from '../../db.js';

export const voteForVote1Controller = (req, res) => {
    const { path } = req.body;

    if (!path) {
        return res.status(400).send('Invalid data');
    }

    const query = 'UPDATE vote1 SET votes = votes + 1 WHERE path = ?';

    db.query(query, [path], (err, results) => {
        if (err) {
            console.error('Error updating votes:', err);
            return res.status(500).send('Error updating votes');
        }
        res.status(200).send('Votes updated successfully');
    });
};
