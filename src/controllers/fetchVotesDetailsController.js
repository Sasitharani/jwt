import db from '../../db.js';

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    const { email } = req.body;


    try {
        const query = `SELECT * FROM ${tableName} WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error In fetch your details contact technical support team');
                return;
            }

            
            if (results.length === 0) {
         
            const insertQuery = `
                INSERT INTO ${tableName} (username, email, MaxLikes, LikesUsed)
                VALUES (?, ?, 10, 1)
            `;
            const values = ['', email];
            db.query(insertQuery, values, (err, insertResults) => {
                if (err) {
                 
                    res.status(500).send('Error in inserting data contact technical support team');
                    return;
                }
                console.log('Vote updated successfully');
                res.status(200).send('Vote updated successfully');
                
            });
        } else {
    
                res.status(200).json(results);
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export { fetchVotesDetails };
