import React, { useState } from 'react';
import PosterPreview from './PosterPreview';
import CameraCapture from './CameraCapture';
import './PhotoUpload.css';

const marineRanks = [
  "-- Pilih Rank --",
  "fleet_admiral",
  "admiral",
  "vice_admiral",
  "rear_admiral",
  "commodore",
  "captain",
  "commander",
  "lieutenant_commander",
  "lieutenant",
  "lieutenant_junior_grade",
  "ensign",
  "warrant_officer",
  "master_chief_petty_officer",
  "petty_officer",
  "seaman_first_class",
  "seaman_apprentice",
  "seaman_recruit",
];

const wantedStatusOptions = [
  "-- Pilih Wanted Status --",
  "Dead or Alive",
  "Only Dead",
  "Only Alive",
  "Unknown",
  "Pardoned",
  "Captured",
];

const photoFilters = [
  "none",
  "grayscale(100%)",
  "sepia(100%)",
  "contrast(150%)",
  "brightness(120%)",
  "invert(100%)",
];

const formatRank = (rank) => rank.replace(/_/g, ' ');

const PosterForm = () => {
  const [status, setStatus] = useState('');
  const [wantedStatus, setWantedStatus] = useState(wantedStatusOptions[0]);
  const [name, setName] = useState('');
  const [bounty, setBounty] = useState('');
  const [rank, setRank] = useState(marineRanks[0]);
  const [photo, setPhoto] = useState(null);
  const [photoFilter, setPhotoFilter] = useState('none');
  const [showOptions, setShowOptions] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const [nameError, setNameError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatus(val);
    setPhoto(null);
    setName('');
    setBounty('');
    setWantedStatus(wantedStatusOptions[0]);
    setRank(marineRanks[0]);
    setNameError('');
    setToastMessage('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop().toLowerCase();
      const isValidExt = validExtensions.includes(extension);
      const isValidSize = file.size <= 2 * 1024 * 1024;

      if (!isValidExt) {
        setToastMessage('❌ Format file harus .jpg, .jpeg, atau .png');
        return;
      }

      if (!isValidSize) {
        setToastMessage('❌ Ukuran file maksimum 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setToastMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBountyChange = (e) => {
    const raw = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(raw)) {
      setBounty(raw);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);

    if (/\d/.test(val)) {
      setNameError('Nama tidak boleh mengandung angka.');
      setToastMessage('⚠️ Nama tidak boleh mengandung angka.');
    } else {
      setNameError('');
      setToastMessage('');
    }
  };

  const isFormComplete = () => {
    if (!status || !photo) return false;
    if ((status === 'pirate' || status === 'revolutionary') && (!bounty || wantedStatus === wantedStatusOptions[0])) return false;
    if (status === 'marine' && rank === marineRanks[0]) return false;
    if (!name || /\d/.test(name)) return false;
    return true;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Your Bounty Poster</h2>

      {toastMessage && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {toastMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setToastMessage('')}
          ></button>
        </div>
      )}

      <form className="mb-4">
        <div className="mb-3">
          <label className="form-label">Status (Frame)</label>
          <select className="form-select" value={status} onChange={handleStatusChange}>
            <option value="">-- Pilih Status --</option>
            <option value="pirate">Pirate</option>
            <option value="marine">Marine</option>
            <option value="revolutionary">Revolutionary</option>
          </select>
        </div>

        {(status === 'pirate' || status === 'revolutionary') && (
          <div className="mb-3">
            <label className="form-label">Wanted Status</label>
            <select
              className="form-select"
              value={wantedStatus}
              onChange={(e) => setWantedStatus(e.target.value)}
            >
              {wantedStatusOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${nameError ? 'is-invalid' : ''}`}
            value={name}
            disabled={!status}
            onChange={handleNameChange}
            placeholder={status === 'marine' ? "Nama Marine" : "Nama Karakter"}
            maxLength={30}
          />
          {nameError && (
            <div className="invalid-feedback">
              {nameError}
            </div>
          )}
        </div>

        {status === 'marine' && (
          <div className="mb-3">
            <label className="form-label">Rank</label>
            <select
              className="form-select"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            >
              {marineRanks.map((r) => (
                <option key={r} value={r}>{formatRank(r)}</option>
              ))}
            </select>
          </div>
        )}

        {(status === 'pirate' || status === 'revolutionary') && (
          <div className="mb-3">
            <label className="form-label">Bounty</label>
            <input
              type="text"
              className="form-control"
              value={bounty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled={!status}
              onChange={handleBountyChange}
              placeholder="1,500,000"
              maxLength={15}
            />
          </div>
        )}

        <div className="mb-3 position-relative">
          <label className="form-label">Photo</label>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => setShowOptions(!showOptions)}
            disabled={!status}
          >
            📷 Pilih Foto
          </button>

          {showOptions && !useCamera && (
            <div className="upload-options bg-light border p-3 mt-2 rounded shadow-sm">
              <button
                type="button"
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => setUseCamera(true)}
              >
                📷 Foto Langsung dari Kamera
              </button>

              <label className="btn btn-outline-secondary w-100 mb-0">
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
                onCancel={() => {
                  setUseCamera(false);
                  setShowOptions(false);
                }}
              />
            </div>
          )}
        </div>

        {photo && (
          <div className="mb-3">
            <label className="form-label">Filter Foto</label>
            <select
              className="form-select"
              value={photoFilter}
              onChange={(e) => setPhotoFilter(e.target.value)}
            >
              {photoFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter === 'none' ? 'Tanpa Filter' : filter}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>

      <PosterPreview
        name={name}
        bounty={bounty}
        title={status === 'marine' ? formatRank(rank) : wantedStatus}
        photo={photo}
        filter={photoFilter}
        frame={status}
        isValid={isFormComplete()}
      />
    </div>
  );
};

export default PosterForm;
