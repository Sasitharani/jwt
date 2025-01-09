import sql from 'mssql';
import sweetalert from 'sweetalert';

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `${today}Likes_20250109`;

    try {
        const pool = await sql.connect(/* your database config */);
        const result = await pool.request()
            .query(`SELECT MaxLikes, LikesUsed FROM ${tableName}`);

        if (result.recordset.length > 0) {
            const { MaxLikes, LikesUsed } = result.recordset[0];

            if (MaxLikes > 0 && MaxLikes != LikesUsed) {
                await pool.request()
                    .query(`UPDATE ${tableName} SET LikesUsed = LikesUsed + 1`);

                res.status(200).send('Vote updated successfully');
            } else {
                sweetalert('All likes used, no likes left');
                res.status(400).send('All likes used, no likes left');
            }
        } else {
            res.status(404).send('No data found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export { updateVotes };
