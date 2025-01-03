import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Entered the post method");
    const form = new formidable.IncomingForm();
    const uploadFolder = path.join(process.cwd(), 'uploads');

    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
      console.log(`Created uploads folder at ${uploadFolder}`);
    } else {
      console.log(`Uploads folder already exists at ${uploadFolder}`);
    }

    form.uploadDir = uploadFolder;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error uploading file');
        return;
      }

      console.log(`File uploaded to ${files.file.path}`);
      res.status(200).send('File uploaded successfully');
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}