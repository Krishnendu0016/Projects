import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setPreview('');
      setMessage('');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type) || selectedFile.size > maxSize) {
      setFile(null);
      setPreview('');
      setMessage('Please select a valid image under 5MB.');
      event.target.value = '';
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUploadedImage('');
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an image');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Upload failed');
      }

      setUploadedImage(data.imageUrl);
      setMessage('✓ Image uploaded successfully');
      setFile(null);
      setPreview('');
      setLoading(false);
    } catch (error) {
      setMessage(error.message || 'Upload failed. Please try again.');
      setLoading(false);
    }
  };

  const handleUploadAnother = () => {
    setFile(null);
    setPreview('');
    setUploadedImage('');
    setMessage('');
    const fileInput = document.getElementById('imageInput');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="container">
      <h1>Image Upload</h1>

      {!uploadedImage ? (
        <>
          <label htmlFor="imageInput" className="label">
            Select an image
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />

          {preview && (
            <div className="preview-box">
              <p>Selected Image:</p>
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || loading}
            className="upload-btn"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={handleUploadAnother} className="upload-btn secondary">
            Upload Another Image
          </button>
        </>
      )}

      {message && <p className="message">{message}</p>}

      {uploadedImage && (
        <div className="preview-box">
          <p>Uploaded Image:</p>
          <img
            src={`http://localhost:5000${uploadedImage}`}
            alt="Uploaded"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}

export default App;
