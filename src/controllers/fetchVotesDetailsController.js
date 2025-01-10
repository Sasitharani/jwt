import db from '../../db.js';

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    const { email } = req.body;
    console.log('fetchVotesDetails called with fetchVotesDetailsController:', 'and email:', email);
    console.log('Table name fetchVotesDetailsController:', tableName);

    console.log('Received email fetchVotesDetailsController:', email);

    try {
        const query = `SELECT * FROM ${tableName} WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error In fetch your details contact technical support team');
                return;
            }

            console.log('Result length of SELECT query from fetchVotesDetailsController:', results.length);
            if (results.length === 0) {
            console.log("Enter the if loop in updateVotesController");
            const insertQuery = `
                INSERT INTO ${tableName} (username, email, MaxLikes, LikesUsed)
                VALUES (?, ?, 10, 1)
            `;
            const values = ['', email];
            db.query(insertQuery, values, (err, insertResults) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).send('Error in inserting data contact technical support team');
                    return;
                }
                console.log('Vote updated successfully');
                res.status(200).send('Vote updated successfully');
                
            });
        } else {
                console.log('Result of SELECT query from fetchVotesDetailsController:', results);
                res.status(200).json(results);
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export { fetchVotesDetails };
