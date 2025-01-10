import db from '../../db.js';

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    const { username, email } = req.body;

    try {
        const query = `SELECT * FROM ${tableName}`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log('Result of SELECT query from fetch vote details:', results);

            if (results && results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).send('No data found');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export {
    fetchVotesDetails
};
