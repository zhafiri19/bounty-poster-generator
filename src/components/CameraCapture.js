import React, { useRef, useEffect } from 'react';

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Simpan stream di ref

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        streamRef.current = mediaStream;
      } catch (err) {
        console.error('Gagal akses kamera:', err);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    // Stop camera setelah capture
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    onCapture(imageData);
  };

  const handleCancel = () => {
    // Stop camera saat user klik batal
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    onCancel();
  };

  return (
    <div className="text-center p-3 border rounded bg-light">
      <video ref={videoRef} autoPlay playsInline className="w-100 mb-3 rounded shadow" />
      <canvas ref={canvasRef} hidden />
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success" onClick={handleCapture}>📸 Ambil Foto</button>
        <button className="btn btn-secondary" onClick={handleCancel}>❌ Batal</button>
      </div>
    </div>
  );
};

export default CameraCapture;
