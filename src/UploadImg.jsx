import { useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link

const UploadImg = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const userEmail = useSelector((state) => state.user.email);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (selectedFile && !validFileTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Only image files, PDF, and Word documents are allowed.');
      setFile(null);
      return;
    }

    if (selectedFile && selectedFile.size > maxSize) {
      setError('File size exceeds 1MB. Please upload a smaller file.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      //console.log('File uploaded successfully. The file is located in the uploads folder.');
      Swal.fire('Success', result.message, 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire('Error', 'Error uploading file.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(userEmail);
    //console.log('email', userEmail);
    setSubmitted(false);
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', userEmail);
    formData.append('phone', phone);
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }
    //console.log('Form Data', formData.email);

    try {
      const response = await fetch('https://contest-nda5.onrender.com/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      //console.log('Response text:', responseText);

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setFile(null);
        Swal.fire('Success', 'Email sent successfully.', 'success');
      } else {
        console.error('Error response:', responseText);
        setError('Error sending email');
        Swal.fire('Error', 'Error sending email', 'error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Error sending email');
      Swal.fire('Error', 'Error sending email', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', zIndex: 10 }}>
          <div className="feedback-form bg-gray-200 bg-opacity-5 p-8 rounded-lg shadow-md max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto focus-within:bg-gray-300 active:bg-gray-400 transition-colors duration-300">
            {loading && (
              <div className="loading-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="text-white text-lg">
                  <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 mb-4 animate-spin"></div>
                  Please wait, we are uploading your image...
                </div>
              </div>
            )}
            {submitted && (
              <div className="text-green-500 text-xl font-bold text-center mb-4 animate-bounce">
                We have successfully received your Image. We will contact you soon.
              </div>
            )}
            {!submitted && (
              <div className="text-gray-700 text-center mb-4">
                Please upload the image , we will be  happy to contact you back soon.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                  File (Only image files, PDF, and Word documents are allowed. Max size: 1MB)
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <Link
                to="/compress-image"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                If more than 1 MB, compress your image here
              </Link>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-xl font-bold mb-4">Rules</h2>
              <ul className="list-disc list-inside text-left">
                <li>No Sexual images</li>
                <li>Image should not have Human faces. Avoid selfies.</li>
                <li>Allowed photos:
                  <ul className="list-disc list-inside ml-4">
                    <li>Nature</li>
                    <li>Objects</li>
                    <li>Animals</li>
                    <li>Birds</li>
                    <li>Insects</li>
                  </ul>
                </li>
                <li>Use own images. Photos uploaded from the internet will be rejected.</li>
              </ul>
              <p className="mt-4 text-red-500">If the above rules are not followed, the photos will not be selected.</p>
            </div>
          </div>
        </div>
        <div style={{ width: '15%', height: '100vh', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Advertisement Space</p>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;