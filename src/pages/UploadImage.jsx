import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                console.log('Fetching files...');
                const response = await axios.get('/api/images');
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h1>Upload Image</h1>
            <div>
                {files.map((file, index) => (
                    <div key={index}>
                        <img 
                            src={`https://www.contests4all.com/uploads/2025-01-03/${file}`} 
                            alt={file} 
                            className="image" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
