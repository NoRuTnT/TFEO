import Modal from '@mui/material/Modal';
import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import html2canvas from 'html2canvas';
const ContractSignatureModal = ({ open, handleClose }: any) => {
  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const getCursorPosition = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - rect.left;
    const clientY = (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - rect.top;
    return { x: clientX, y: clientY };
  };

  const handleMouseDown: React.MouseEventHandler & React.TouchEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCursorPosition(event.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove: React.MouseEventHandler & React.TouchEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCursorPosition(event.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    html2canvas(canvas).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      setSignature(dataURL);
    });
  };
  const handleDownload = () => {
    if (!signature) return;
    const link = document.createElement('a');
    link.href = signature;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle}>
        <div>모달띄우기</div>
        <div>
          <canvas
            ref={canvasRef}
            width={150}
            height={100}
            style={{ border: '1px solid black' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          />
        </div>
        <Button onClick={handleCapture}>서명 완료</Button>
        <Button onClick={handleDownload}>서명 다운로드</Button>
      </Box>
    </Modal>
  );
};
export default ContractSignatureModal;
