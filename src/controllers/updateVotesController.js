import sql from 'mssql';
import sweetalert from 'sweetalert2';
import db from '../../db.js'; // Ensure the correct path

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;

    console.log('updateVotes called');
    console.log('Table name:', tableName);

    try {
        const [result] = await db.promise().query(`SELECT MaxLikes, LikesUsed FROM ${tableName}`);

        console.log('Query result:', result);

        if (result.length > 0) {
            const { MaxLikes, LikesUsed } = result[0];

            if (MaxLikes > 0 && MaxLikes != LikesUsed) {
                await db.promise().query(`UPDATE ${tableName} SET LikesUsed = LikesUsed + 1`);

                res.status(200).send('Vote updated successfully');
            } else {
                sweetalert('All likes used, no likes left');
                res.status(400).send('All likes used, no likes left');
            }
        } else {
            res.status(404).send('No data found');
        }
    } catch (err) {
        console.error('Error in updateVotes:', err);
        res.status(500).send('Server error');
    }
};

export { updateVotes };
