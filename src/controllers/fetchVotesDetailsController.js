import sql from 'mssql';
import db from '../../db.js';

const checkAndInsertDefaultValues = async (tableName, username, email) => {
    try {
        const result = db.query(`SELECT * FROM ${tableName}`);

        if (result.recordset.length === 0) {
          db.query(`
                INSERT INTO ${tableName} (username, email, MaxLikes)
                VALUES ('${username}', '${email}', 10)
            `);
        }
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
        const result = db.query(`SELECT * FROM ${tableName}`);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).send('No data found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export {
    fetchVotesDetails
};
