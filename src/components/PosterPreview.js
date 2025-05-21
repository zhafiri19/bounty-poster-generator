import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const PosterPreview = ({ name, bounty, title, photo, frame = '' }) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = `${name || 'poster'}_poster.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const formatBounty = (amount) => {
    const numeric = Number(amount);
    return isNaN(numeric) ? '???' : numeric.toLocaleString('en-US');
  };

  const frameText = {
    pirate: 'WANTED',
    marine: 'MARINE',
    revolutionary: 'REVOLUTION',
  };

  const posterClass = `poster ${frame ? `poster-frame-${frame}` : ''}`;

  const isFormComplete =
    name &&
    photo &&
    ((frame === 'marine' && title) ||
      ((frame === 'pirate' || frame === 'revolutionary') && bounty && title));

  // Render real-time values or fallback to ???
  const renderValue = (val) => (val ? val.toUpperCase() : '???');

  return (
    <div className="text-center mt-5 px-2">
      <div className={posterClass} ref={previewRef}>
        <h1
          className="fw-bold"
          style={{ textTransform: 'uppercase' }}
        >
          {frameText[frame] || 'WANTED'}
        </h1>

        {/* Photo */}
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
                border: `4px solid`,
              }}
            />
          ) : (
            <div
              style={{
                width: '280px',
                height: '320px',
                borderRadius: '8px',
                border: `4px solid`,
                backgroundColor: '#f0f0f0',
              }}
            />
          )}
        </div>

        {/* Subtitle / Rank / Title */}
        <div
          className="subtitle mt-2"
          style={{ fontWeight: 'bold', fontSize: '1.25rem', textTransform: 'uppercase' }}
        >
          {frame === 'marine'
            ? renderValue('World Government')
            : renderValue(title)}
        </div>


        {/* Name */}
        <h2 className="mt-1" style={{ letterSpacing: '3px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {renderValue(name)}
        </h2>

        {/* Rank for marine */}
        {frame === 'marine' && (
          <div
            style={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}
          >
            
            {renderValue(title)}
          </div>
        )}

        {/* Bounty only for pirate & revolutionary */}
        {(frame === 'pirate' || frame === 'revolutionary') && (
          <div
            className="bounty mt-2"
            style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            {bounty ? `Bounty: ${formatBounty(bounty)}` : '???'}
          </div>
        )}
      </div>

      <button
        className="btn btn-success mt-4"
        disabled={!isFormComplete}
        onClick={handleDownload}
      >
        Download Poster
      </button>
    </div>
  );
};

export default PosterPreview;
