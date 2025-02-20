import db from '../../db.js'; // Ensure the correct path

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    let { email } = req.body;

    try {
        const selectQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
        db.query(selectQuery, [email], (err, selectResults) => {
            if (err) {
                console.error('Error selecting data:', err);
                return res.status(500).send('Error in fetching your data. Please contact the technical support team.');
            }

            if (selectResults.length > 0) {
                const { MaxLikes, LikesUsed, LikesAvailable } = selectResults[0];
                const updatedLikesAvailable = LikesAvailable - 1;

                if (MaxLikes === LikesUsed) {
                    console.log('All likes used, no likes left');
                    return res.status(400).send('All likes used, no likes left');
                }

                const updateLikesAvailableQuery = `UPDATE ${tableName} SET LikesAvailable = ? WHERE email = ?`;
                db.query(updateLikesAvailableQuery, [updatedLikesAvailable, email], (err) => {
                    if (err) {
                        console.error('Error updating LikesAvailable:', err);
                        return res.status(500).send('Error in updating LikesAvailable. Please contact the technical support team.');
                    }

                    const updateQuery = `UPDATE ${tableName} SET LikesUsed = LikesUsed + 1 WHERE email = ?`;
                    db.query(updateQuery, [email], (err) => {
                        if (err) {
                            console.error('Error updating data:', err);
                            return res.status(500).send('Error in updating the votes. Please contact the technical support team.');
                        }

                        const selectAllQuery = `SELECT * FROM ${tableName}`;
                        db.query(selectAllQuery, (err, allResults) => {
                            if (err) {
                                console.error('Error selecting all data:', err);
                                return res.status(500).send('Error in fetching all data. Please contact the technical support team.');
                            }

                            console.log('All values from the table:', allResults);
                            return res.status(200).json(allResults);
                        });
                    });
                });
            } else {
                console.log('No data found for the given email.');
                return res.status(404).send('No data found for the given email.');
            }
        });
    } catch (err) {
        console.error('Error selecting data:', err);
        return res.status(500).send('Error in fetching your data. Please contact the technical support team.');
    }
};

const fetchAllResults = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;

    try {
        const selectAllQuery = `SELECT * FROM ${tableName}`;
        db.query(selectAllQuery, (err, allResults) => {
            if (err) {
                console.error('Error selecting all data:', err);
                return res.status(500).send('Error in fetching all data. Please contact the technical support team.');
            }

            console.log('All values from the table:', allResults);
            return res.status(200).json(allResults);
        });
    } catch (err) {
        console.error('Error fetching all results:', err);
        return res.status(500).send('Error in fetching all results. Please contact the technical support team.');
    }
};

export { updateVotes, fetchAllResults };


