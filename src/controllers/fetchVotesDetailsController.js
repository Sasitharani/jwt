import db from '../../db.js';
import { sendEmail } from '../utils/emailUtil.js'; // Import email utility

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    const { email, username } = req.body;
    //console.log('Email:', email);
    //console.log('Username:', username);

    try {
        const query = `SELECT * FROM ${tableName} WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                const errorMessage = `Error in fetching details for email: ${email}. Please contact the technical support team.`;
                sendEmail('error@contests4all.com', 'Error Notification', errorMessage);
                res.status(500).send(errorMessage);
                return;
            }

            if (results.length === 0) {
                const insertQuery = `
                    INSERT INTO ${tableName} (username, email, MaxLikes, LikesUsed)
                    VALUES (?, ?, 10, 1)
                `;
                const values = [username, email];
                db.query(insertQuery, values, (err, insertResults) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        const errorMessage = `Error in inserting data for email: ${email}. Please contact the technical support team.`;
                        sendEmail('error@contests4all.com', 'Error Notification', errorMessage);
                        res.status(500).send(errorMessage);
                        return;
                    }
                    //console.log('Vote updated successfully');
                    res.status(200).send('Vote updated successfully');
                });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        console.error(err);
        const errorMessage = 'Server error';
        sendEmail('error@contests4all.com', 'Error Notification', errorMessage);
        res.status(500).send(errorMessage);
    }
};

export { fetchVotesDetails };
