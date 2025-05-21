import React, { useState } from 'react';
import PosterPreview from './PosterPreview';
import './PhotoUpload.css'; // Buat file ini untuk styling dropdown
import CameraCapture from './CameraCapture';

const PosterForm = () => {
  const [name, setName] = useState('');
  const [bounty, setBounty] = useState('');
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [useCamera, setUseCamera] = useState(false);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Your Bounty Poster</h2>
      <form className="mb-4">
        <div className="mb-3">
          <label className="form-label">Character Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Monkey D Luffy" />
        </div>

        <div className="mb-3">
          <label className="form-label">Bounty</label>
  <input
  type="text"
  className="form-control"
  value={bounty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  onChange={(e) => {
    const raw = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(raw)) {
      setBounty(raw);
    }
  }}
  placeholder="1,500,000"
/>


</div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Captain" />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label">Photo</label>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => setShowOptions(!showOptions)}
          >
            📷 Pilih Foto
          </button>

         {showOptions && !useCamera && (
  <div className="upload-options bg-light border p-3 mt-2 rounded shadow-sm">
    <button
      className="btn btn-outline-primary w-100 mb-2"
      onClick={() => setUseCamera(true)}
    >
      📷 Foto Langsung dari Kamera
    </button>

    <label className="btn btn-outline-secondary w-100">
      🖼️ Pilih dari File
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handlePhotoChange}
      />
    </label>
  </div>
)}

{useCamera && (
  <div className="mt-3">
    <CameraCapture
      onCapture={(imageData) => {
        setPhoto(imageData);
        setUseCamera(false);
        setShowOptions(false);
      }}
      onCancel={() => setUseCamera(false)}
    />
  </div>
)}

        </div>
      </form>

      <PosterPreview name={name} bounty={bounty} title={title} photo={photo} />
    </div>
  );
};

export default PosterForm;
