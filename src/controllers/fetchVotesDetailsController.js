import sql from 'mssql';

const fetchVotesDetails = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `${today}Likes`;

    try {
        const pool = await sql.connect(/* your database config */);
        const result = await pool.request()
            .query(`SELECT * FROM ${tableName}`);

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
