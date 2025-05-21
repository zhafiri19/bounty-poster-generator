import React, { useRef, useState, useEffect } from 'react';

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Minta akses ke kamera
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error('Gagal akses kamera:', err);
      }
    };

    startCamera();

    return () => {
      // Hentikan kamera saat komponen unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    onCapture(imageData);
  };

  return (
    <div className="text-center p-3 border rounded bg-light">
      <video ref={videoRef} autoPlay playsInline className="w-100 mb-3 rounded shadow" />
      <canvas ref={canvasRef} hidden />
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success" onClick={handleCapture}>📸 Ambil Foto</button>
        <button className="btn btn-secondary" onClick={onCancel}>❌ Batal</button>
      </div>
    </div>
  );
};

export default CameraCapture;
