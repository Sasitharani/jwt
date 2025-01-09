import sql from 'mssql';
import db from '../../db.js';

const checkAndInsertDefaultValues = async (tableName, username, email) => {
    try {
        const query = `SELECT * FROM ${tableName}`;
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching data:', err);
                throw new Error('Error checking or inserting default values');
            }

            if (result.recordset.length === 0) {
                const insertQuery = `
                    INSERT INTO ${tableName} (username, email, MaxLikes)
                    VALUES (?, ?, 10)
                `;
                const values = [username, email];
                db.query(insertQuery, values, (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        throw new Error('Error checking or inserting default values');
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
        throw new Error('Error checking or inserting default values');
    }
};

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    const { username, email } = req.body;

    try {
        await checkAndInsertDefaultValues(tableName, username, email);
        const query = `SELECT * FROM ${tableName}`;
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Server error');
                return;
            }

            if (result.recordset.length > 0) {
                res.status(200).json(result.recordset);
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
