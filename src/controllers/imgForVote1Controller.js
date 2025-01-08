import db from '../../db.js';

export const imgForVote1Controller = (req, res) => {
    const { checkedImages, email } = req.body; // Get email from req.body

    if (!checkedImages || !Array.isArray(checkedImages)) {
        return res.status(400).send('Invalid data');
    }

    const query = 'INSERT INTO vote1 (path, email) VALUES ?';
    const values = checkedImages.map(image => [image, email]); // Include email in the values

    db.query(query, [values], (err, results) => {
        if (err) {
            console.error('Error saving votes:', err);
            return res.status(500).send('Error saving votes');
        }
        res.status(200).send('Votes saved successfully');
    });
};
