<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'test.insphile.in/error.log'); // Replace with the actual path to your error log file

// Set the default timezone to IST
date_default_timezone_set('Asia/Kolkata');

// Include PHPMailer files
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = basename($_FILES['file']['name']);
        $destPath = $uploadDir . $fileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // File uploaded successfully, now send an email
            $mail = new PHPMailer(true);
            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host = 'localhost'; // Use localhost as the SMTP server
                $mail->SMTPAuth = false; // No SMTP authentication
                $mail->Port = 25; // Use port 25

                // Enable verbose debug output
                $mail->SMTPDebug = 2;
                $mail->Debugoutput = 'error_log';

                // Recipients
                $mail->setFrom('sasitharani@gmail.com', 'Sasitharani');
                $mail->addAddress('sasitharani@gmail.com', 'Sasitharani'); // Add a recipient
                

                // Attachments
                $mail->addAttachment($destPath); // Add the uploaded file as an attachment

                // Content
                $mail->isHTML(true);
                $mail->Subject = 'New File Uploaded';
                $mail->Body = 'A new file has been uploaded. Please find the attachment.';

                $mail->send();
                echo 'File uploaded and email sent successfully.';
            } catch (Exception $e) {
                error_log("Mailer Error: {$mail->ErrorInfo}");
                echo "File uploaded but email could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        } else {
            error_log('There was an error moving the uploaded file.');
            echo 'There was an error moving the uploaded file.';
        }
    } else {
        error_log('No file uploaded or there was an upload error.');
        echo 'No file uploaded or there was an upload error.';
    }
} else {
    error_log('Invalid request method.');
    echo 'Invalid request method.';
}
?>