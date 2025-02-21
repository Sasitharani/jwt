import db from '../../db.js'; // Ensure the correct path
import nodemailer from 'nodemailer'; // Import nodemailer

let isCalled = false; // Flag to track if the function has been called

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sasitharani@gmail.com',
    pass: 'zfikzmnxyuicssim',
  },
});

const createUserSessionDB = (req, res) => {
  if (isCalled) {
    return res.status(400).json({ error: 'Function has already been called' });
  }

  isCalled = true; // Set the flag to true

  const { email } = req.body; // Extract email from request body
  const logMessage = `Create User Session DB called for email: ${email}`;
  console.log(logMessage);

  // Send log message as email
  transporter.sendMail({
    from: 'sasitharani@gmail.com',
    to: 'error@contests4all.com',
    subject: 'Log Notification',
    text: logMessage,
  });

  const today = new Date();
  const formattedDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  const tableName = `todaysDateLikes_${formattedDate}`;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      SrNo INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      MaxLikes INT DEFAULT 10,
      LikesUsed INT DEFAULT 0,
      LikesAvailable INT DEFAULT 10,
      MaxImages INT DEFAULT 0,
      ImagesUploaded INT DEFAULT 0,
      Membership VARCHAR(50),
      lastSpinTime INT,
      timeDiff BIGINT
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      const errorMessage = `Error creating table for email: ${email}`;
      
      // Send email notification
      transporter.sendMail({
        from: 'sasitharani@gmail.com',
        to: 'error@contests4all.com',
        subject: 'Error Notification',
        text: errorMessage,
      });

      return res.status(500).json({ error: errorMessage });
    }
    res.status(200).json({ message: 'Table created successfully' });
  });
};

export { createUserSessionDB };













