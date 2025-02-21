import ftp from 'ftp';
import path from 'path';

const getAllImages = (req, res) => {
  //console.log("Images hit");
  const client = new ftp();
  const images = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  client.on('ready', () => {
    client.list('/public_html/www.contests4all.com/public/img/uploads', (err, files) => {
      if (err) {
        console.error('Error reading uploads directory:', err);
        res.status(500).send('Error reading uploads directory');
        client.end();
        return;
      }

      files.forEach(file => {
        if (imageExtensions.includes(path.extname(file.name).toLowerCase())) {
          images.push({
            name: file.name,
            url: `/public/img/uploads/${file.name}`
          });
        }
      });

      res.json(images);
      client.end();
    });
  });

  client.connect({
    host: "68.178.150.66",
    user: "l3ppzni4r1in",
    password: "SasiJaga09$",
  });
};

export { getAllImages };