import db from '../../db.js';

export const hashThePasswordController = (req, res) => {
    console.log('Hashing');
    const { username, email, password, hpassword } = req.body;

    console.log('Hashed Password during Pass:', hpassword);

    const query = `
        INSERT INTO userdb (username, password, email, Pass)
        VALUES (?, ?, ?, ?)
    `;
    const values = [username, password, email, hpassword];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Signup failed. Please try again.');
            return;
        }
        const result = results[0];
        res.status(201).send({ message: 'User registered successfully!', result });
    });
};
