import Swal from 'sweetalert2';
import db from '../../db.js'; // Ensure the correct path

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    let { username, email } = req.body;

    console.log('updateVotes called');
    console.log('Table name:', tableName);
    console.log('Received username:', username);
    console.log('Received email:', email);

    if (!username) {
        username = 'google login';
    }

    try {
        const query = `SELECT * FROM ${tableName}`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log('In updateVotesController Query results length:', results.length);

            if (results.length === 0) {
                console.log("Enter the if loop in updateVotesController");
                const insertQuery = `
                    INSERT INTO ${tableName} (username, email, MaxLikes, LikesUsed)
                    VALUES (?, ?, 10, 1)
                `;
                const values = [username, email];
                db.query(insertQuery, values, (err, insertResults) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        res.status(500).send('Server error');
                        return;
                    }
                    console.log('Vote updated successfully');
                    res.status(200).send('Vote updated successfully');
                });
            } else {
                console.log("Enter the else loop in updateVotesController");
                const selectQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
                db.query(selectQuery, [email], (err, selectResults) => {
                    if (err) {
                        console.error('Error selecting data:', err);
                        res.status(500).send('Server error');
                        return;
                    }

                    if (selectResults.length > 0) {
                        const { MaxLikes, LikesUsed } = selectResults[0];
                        if (MaxLikes === LikesUsed) {
                            console.log('All likes used, no likes left');
                            res.status(400).send('All likes used, no likes left');
                        } else {
                            const updateQuery = `UPDATE ${tableName} SET LikesUsed = LikesUsed + 1 WHERE email = ?`;
                            db.query(updateQuery, [email], (err, updateResults) => {
                                if (err) {
                                    console.error('Error updating data:', err);
                                    res.status(500).send('Server error');
                                    return;
                                }
                                console.log('Vote updated successfully');
                                res.status(200).send('Vote updated successfully');
                            });
                        }
                    } else {
                        console.log('No data found for the given email');
                        res.status(404).send('No data found for the given email');
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error in updateVotes:', err);
        res.status(500).send('Server error');
    }
};

export { updateVotes };
