import Swal from 'sweetalert2';
import db from '../../db.js'; // Ensure the correct path

const updateVotes = async (req, res) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const tableName = `todaysDateLikes_${today}`;
    let { email } = req.body;

    console.log('updateVotes called');
    console.log('Table name:', tableName);

    console.log('Received email:', email);


    try {
                const selectQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
                db.query(selectQuery, [email], (err, selectResults) => 
        {
                    if (err) {
                        console.error('Error selecting data:', err);
                        res.status(500).send('Error in fetching the Your data contact technical support team');
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
                                    res.status(500).send('Error in updating the Votes contact technical support team');
                                    return;
                                }
                                console.log('Vote updated successfully');
                                res.status(200).send('Vote updated successfully');
                            });
                        }
                    } else {
                        console.log('No data found for the given email.');
                        res.status(404).send('No data found for the given email from updateVotesController');
                    }
            });
        }
        catch (err) {
            console.error('Error selecting data:', err);
            res.status(500).send('Error in fetching the Your data contact technical support team');
        }
    }

export { updateVotes };


