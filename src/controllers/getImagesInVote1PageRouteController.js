import db from '../../db.js';

export const getImagesInVote1PageController = (req, res) => {
    const query = 'SELECT path, votes FROM vote1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching images:', err);
            return res.status(500).send('Error fetching images');
        }
        res.status(200).json(results);
    });
};
