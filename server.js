import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js'; // Import the connection pool
import deleteImageRoute from './src/routes/deleteImageRoute.js'; // Import deleteImageRoute
import getAllImagesRoute from './src/routes/getAllImagesRoute.js'; // Import getAllImagesRoute
import loginRoute from './src/routes/loginRoute.js'; // Import loginRoute
import googleLoginRoute from './src/routes/googleLoginRoute.js'; // Ensure the correct path
import signupRoute from './src/routes/signupRoute.js'; // Import signupRoute
import checkEmailAvailabilityRoute from './src/routes/checkEmailAvailabilityRoute.js'; // Import checkEmailAvailabilityRoute
import fileUploadSendEmailRoute from './src/routes/fileUploadSendEmailRoute.js'; // Import fileUploadSendEmailRoute
import passwordResetRoute from './src/routes/passwordResetRoute.js'; // Import passwordResetRoute
import hashThePasswordRoute from './src/routes/hashThePasswordRoute.js'; // Import hashThePasswordRoute
import comparePasswordRoute from './src/routes/comparePaswswordRoute.js'; // Import comparePasswordRoute
import imgForVote1Route from './src/routes/imgForVote1Route.js'; // Import imgForVote1Route
import getImagesInVote1PageRoute from './src/routes/getImagesInVote1PageRoute.js'; // Import getImagesInVote1PageRoute
import voteForVote1Route from './src/routes/voteForVote1Route.js'; // Import voteForVote1Route
import createUserSessionDBRoute from './src/routes/createUserSessionDBRoute.js'; // Import createUserSessionDBRoute
import fetchVotesDetailsRoute from './src/routes/fetchVotesDetailsRoute.js'; // Import fetchVotesDetailsRoute
import updateVotesRoute from './src/routes/updateVotesRoutes.js'; // Import updateVotesRoute
import spinWheelRoute from './src/routes/spinWheelRoute.js'; // Correct the file extension to .jsx
import logsRoute from './src/routes/logsRoute.js'; // Import logsRoute
import './src/scheduler/createUserSessionJob.js'; // Import the scheduler scriptimport nodemailer from 'nodemailer'; // Import nodemailer for email notifications

dotenv.config();dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORSCORS
app.use(bodyParser.json());app.use(bodyParser.json());

// Use the imported routes
app.use('/api', deleteImageRoute);teTransport({
app.use('/api', getAllImagesRoute);
app.use('/api', loginRoute);
app.use('/api', googleLoginRoute); // Ensure the correct routeSER,
app.use('/api', signupRoute);
app.use('/api', checkEmailAvailabilityRoute);
app.use('/api', fileUploadSendEmailRoute);
app.use('/api', passwordResetRoute);
app.use('/api', hashThePasswordRoute);s
app.use('/api', comparePasswordRoute);ject, message) => {
app.use('/api', imgForVote1Route);
app.use('/api', getImagesInVote1PageRoute);
app.use('/api', voteForVote1Route);
app.use('/api', createUserSessionDBRoute);
app.use('/api', fetchVotesDetailsRoute);
app.use('/api', updateVotesRoute);
app.use('/api', spinWheelRoute); // Add this line
  transporter.sendMail(mailOptions, (error, info) => { the logs route

      console.error('Error sending email:', error);
    } else {onsole.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });      console.log('Email sent:', info.response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});// Middleware to log console messages
























































});    console.log(`Server is running on port ${PORT}`);app.listen(PORT, () => {});  res.status(500).json({ error: 'Internal Server Error', details: err.message });  console.error('Unhandled error:', err);app.use((err, req, res, next) => {app.use('/api', spinWheelRoute); // Add this lineapp.use('/api', updateVotesRoute);app.use('/api', fetchVotesDetailsRoute);app.use('/api', createUserSessionDBRoute);app.use('/api', voteForVote1Route);app.use('/api', getImagesInVote1PageRoute);app.use('/api', imgForVote1Route);app.use('/api', comparePasswordRoute);app.use('/api', hashThePasswordRoute);app.use('/api', passwordResetRoute);app.use('/api', fileUploadSendEmailRoute);app.use('/api', checkEmailAvailabilityRoute);app.use('/api', signupRoute);app.use('/api', googleLoginRoute); // Ensure the correct routeapp.use('/api', loginRoute);app.use('/api', getAllImagesRoute);app.use('/api', deleteImageRoute);// Use the imported routesapp.use(logMiddleware);};  next();  };    originalConsoleError(message, ...optionalParams);    sendEmailNotification('Error Message', errorMessage);    });      if (err) console.error('Error inserting error log:', err);    db.query('INSERT INTO logs (message, type) VALUES (?, ?)', [errorMessage, 'error'], (err) => {    const errorMessage = `[${new Date().toISOString()}] [server] ${message}`;  console.error = (message, ...optionalParams) => {  };    originalConsoleLog(message, ...optionalParams);    sendEmailNotification('Log Message', logMessage);    });      if (err) console.error('Error inserting log:', err);    db.query('INSERT INTO logs (message, type) VALUES (?, ?)', [logMessage, 'log'], (err) => {    const logMessage = `[${new Date().toISOString()}] [server] ${message}`;  console.log = (message, ...optionalParams) => {  const originalConsoleError = console.error;  const originalConsoleLog = console.log;
const logMiddleware = (req, res, next) => {