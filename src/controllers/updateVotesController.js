import sweetalert from 'sweetalert2';
import db from '../../db.js'; // Ensure the correct path

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;

    console.log('updateVotes called');
    console.log('Table name:', tableName);

    try {
        const query = `SELECT MaxLikes, LikesUsed FROM ${tableName}`;
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log('Query result:', result);
            if (result) {
                console.log('Result recordset:', result.recordset);
                if (result.recordset.length > 0) {
                    console.log('MaxLikes and LikesUsed fetched:', result.recordset[0]);
                    const { MaxLikes, LikesUsed } = result.recordset[0];

                    if (MaxLikes > 0 && MaxLikes != LikesUsed) {
                        const updateQuery = `UPDATE ${tableName} SET LikesUsed = LikesUsed + 1`;
                        db.query(updateQuery, (err, result) => {
                            if (err) {
                                console.error('Error updating data:', err);
                                res.status(500).send('Server error');
                                return;
                            }
                            console.log('Vote updated successfully');
                            res.status(200).send('Vote updated successfully');
                        });
                    } else {
                        console.log('All likes used, no likes left');
                        res.status(400).send('All likes used, no likes left');
                    }
                } else {
                    console.log('No data found');
                    res.status(404).send('No data found');
                }
            } else {
                console.log('Result recordset is undefined');
                res.status(404).send('No data found');
            }
        });
    } catch (err) {
        console.error('Error in updateVotes:', err);
        res.status(500).send('Server error');
    }
};

export { updateVotes };
