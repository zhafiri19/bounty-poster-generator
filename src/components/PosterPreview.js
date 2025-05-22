import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const PosterPreview = ({ name, bounty, title, photo, frame = '', filter = 'none', isValid }) => {
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

  const handleShare = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], `${name || 'poster'}_poster.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Bounty Poster',
            text: 'Lihat bounty-ku di dunia One Piece!',
            files: [file],
          });
        } catch (err) {
          console.error('Gagal membagikan:', err);
        }
      } else {
        // Fallback to link share
        const text = encodeURIComponent(`Lihat bounty-ku di dunia One Piece!`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
        const whatsappUrl = `https://wa.me/?text=${text}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://example.com`;

        const newTab = window.open('', '_blank');
        newTab.document.write(`
          <h2>Share ke Sosial Media</h2>
          <p>Web Share API tidak tersedia. Silakan pilih salah satu platform:</p>
          <ul>
            <li><a href="${twitterUrl}" target="_blank">Twitter</a></li>
            <li><a href="${whatsappUrl}" target="_blank">WhatsApp</a></li>
            <li><a href="${facebookUrl}" target="_blank">Facebook</a></li>
          </ul>
        `);
        newTab.document.close();
      }
    }, 'image/png');
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

  const renderValue = (val) => (val ? val.toUpperCase() : '???');

  const photoStyle = {
    width: '280px',
    height: '320px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: `4px solid`,
    filter: filter || 'none',
    transition: '0.3s filter',
    ...(isValid ? {} : { filter: 'blur(6px)' }),
  };

  return (
    <div className="text-center mt-5 px-2">
      <div className={posterClass} ref={previewRef}>
        <h1 className="fw-bold" style={{ textTransform: 'uppercase' }}>
          {frameText[frame] || 'WANTED'}
        </h1>

        <div className="poster-photo mb-3 d-flex justify-content-center">
          {photo ? (
            <img src={photo} alt="Character" style={photoStyle} />
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

        <div
          className="subtitle mt-2"
          style={{ fontWeight: 'bold', fontSize: '1.25rem', textTransform: 'uppercase' }}
        >
          {frame === 'marine'
            ? renderValue('World Government')
            : renderValue(title)}
        </div>

        <h2 className="mt-1" style={{ letterSpacing: '3px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {renderValue(name)}
        </h2>

        {frame === 'marine' && (
          <div style={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase' }}>
            {renderValue(title)}
          </div>
        )}

        {(frame === 'pirate' || frame === 'revolutionary') && (
          <div className="bounty mt-2" style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {bounty ? `Bounty: ${formatBounty(bounty)}` : '???'}
          </div>
        )}
      </div>

      <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <button
          className="btn btn-success"
          disabled={!isValid}
          onClick={handleDownload}
        >
          📥 Download Poster
        </button>

        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={handleShare}
        >
          📤 Share ke Sosial Media
        </button>
      </div>
    </div>
  );
};

export default PosterPreview;
