




import React, { useRef, useEffect, useState } from 'react';

const SignaturePad = ({ field, onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#4B49AC'; // Signature color
    ctx.lineWidth = 2;
    ctx.lineCap = 'round'; // Rounded line ends for a smoother signature
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    // Use PNG format for better quality and transparency support
    const dataURL = canvas.toDataURL('image/png', 1.0); // Convert to PNG format with 100% quality
    setSignature(dataURL);
    onSave(dataURL); // Pass the signature back to the parent component
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null); // Reset signature state
  };

  return (
    <div className="signature-pad p-6 mr-5 bg-[#9b9ef0] rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-center text-[#4B49AC] ml-5 font-bold text-xl mb-6">Signature Pad</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="border-2 py-3 px-3 border-[#4B49AC] rounded-lg mb-4"
      />
      <button
        onClick={clearSignature}
        className="mt-4 w-full bg-[#4B49AC] text-white px-4 py-2 rounded-lg hover:bg-[#9b9ef0] transition duration-300"
      >
        Clear
      </button>
      {signature && (
        <div className="mt-6 text-center">
          <h4 className="text-[#4B49AC] font-semibold text-lg">Your Signature:</h4>
          <img src={signature} alt="User Signature" className="mt-2 border-2 border-[#4B49AC] rounded-lg w-full max-w-xs mx-auto" />
        </div>
      )}
    </div>
  );
};

export default SignaturePad;

