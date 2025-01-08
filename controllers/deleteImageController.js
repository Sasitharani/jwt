const ftp = require('ftp');
const path = require('path');

const deleteImage = (req, res) => {
    const { url } = req.body;

    console.log('URL:', url); // Log the URL to ensure it's being received correctly
    if (!url) {
        return res.status(400).send('Path does not exist. Inform the technical team');
    }

    const client = new ftp();
    client.on('ready', () => {
        const remoteFilePath = `/public_html/www.contests4all.com/public/img/uploads/${path.basename(url)}`;
        client.delete(remoteFilePath, (err) => {
            if (err) {
                console.error('Error deleting image from FTP server:', err);
                return res.status(500).send('Error deleting image from FTP server');
            }
            console.log('Image deleted from FTP server:', remoteFilePath);
            res.status(200).send('Image deleted successfully');
            client.end();
        });
    });

    client.connect({
        host: "68.178.150.66",
        user: "l3ppzni4r1in",
        password: "SasiJaga09$",
    });
};

module.exports = { deleteImage };
