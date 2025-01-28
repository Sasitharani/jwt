import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import Link

const CompressImage = () => {
  const [file, setFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCompressClick = async () => {
    if (!file) {
      Swal.fire('Error', 'Please select a file to compress.', 'error');
      return;
    }

    setLoading(true);

    try {
      const compressedBlob = await compressImage(file, 1 * 1024 * 1024); // 1MB
      const compressedFile = new File([compressedBlob], file.name, { type: file.type });
      setCompressedFile(compressedFile);
      Swal.fire('Success', 'Image compressed successfully.', 'success');
    } catch (error) {
      console.error('Error compressing image:', error);
      Swal.fire('Error', 'Error compressing image.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const compressImage = (file, maxSize) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const scaleFactor = Math.sqrt(maxSize / file.size);
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob.size > maxSize) {
              reject(new Error('Unable to compress image to the desired size.'));
            } else {
              resolve(blob);
            }
          }, file.type);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', zIndex: 10 }}>
          <h1 className="text-2xl font-bold mb-4">Compress Image to 1MB</h1>
          <input type="file" onChange={handleFileChange} className="mb-4" />
          {file && (
            <p className="mb-4">Original Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          )}
          <button
            onClick={handleCompressClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin mr-2"></div>
                Compressing...
              </div>
            ) : (
              'Compress Image'
            )}
          </button>
          {compressedFile && (
            <div className="mt-4 flex flex-col items-center">
              <p className="mt-2">Compressed Size: {(compressedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <a
                href={URL.createObjectURL(compressedFile)}
                download={compressedFile.name}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Download Image
              </a>
            </div>
          )}
          {/* Add an ad in the middle column after the content */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 p-4 rounded-lg shadow-md mx-auto" style={{ width: '33%' }}>
            <h2 className="text-xl font-bold mb-4">Ad</h2>
            {/* Add your ad content here */}
          </div>
          {/* Add a button to navigate back to UploadImg */}
          <div className="mt-8 text-center">
            <Link
              to="/upload-img"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back to Image Uploads
            </Link>
          </div>
        </div>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
      </div>
    </div>
  );
};

export default CompressImage;
