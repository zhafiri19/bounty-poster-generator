import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const PosterPreview = ({ name, bounty, title, photo }) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = `${name || 'bounty'}_poster.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const isFormComplete = name && bounty && title && photo;

const formatBounty = (amount) => {
  const numeric = Number(amount);
  return isNaN(numeric) ? '???' : numeric.toLocaleString('en-US');
};

  return (
    <div className="text-center mt-5 px-2">
      <div className="poster p-4" ref={previewRef}>
        <h1 className="fw-bold text-danger">WANTED</h1>

         {/* Gambar dengan aspect ratio supaya tidak gepeng */}
          <div className="poster-photo mb-3 d-flex justify-content-center">
          {photo ? (
            <img
              src={photo}
              alt="Character"
              style={{
                width: '280px',
                height: '320px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '4px solid #3c2f1c',
              }}
            />
          ) : (
            <div
              style={{
                width: '280px',
                height: '320px',
                borderRadius: '8px',
                border: '4px solid #3c2f1c',
              }}
            />
          )}
        </div>

        <div className="subtitle mt-2">DEAD OR ALIVE</div>
        <h2 className="text-uppercase">{name || 'Your Name Here'}</h2>
        <div className="subtitle text-uppercase">{title || 'Status'}</div>
        <div className="bounty fs-4 mt-2">
          <span className="onepiece-berry">฿</span>{' '}
          {bounty ? formatBounty(bounty) : '???'}
        </div>

        <div className="poster-text-small">
         Authorized by the World Government. Reward payable upon capture.
        </div>
        <div className="poster-marine-label">MARINE</div>
      </div>

      {isFormComplete && (
        <div className="mt-4">
          <button onClick={handleDownload} className="btn btn-success">
            Download Poster
          </button>
        </div>
      )}
    </div>
  );
};

export default PosterPreview;
