import Modal from '@mui/material/Modal';
import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import { PDFDocument, PDFFont, PDFImage, PDFPage, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { getContractFormPreSignedUrl, signContract } from '../../api/ContractApis';
import { IContract } from '../../interfaces/ContractInterface';
import { getFileFromS3, uploadFileToS3 } from '../../api/S3Apis';

type handleCloseType = () => void;
interface Props {
  open: boolean;
  handleClose: handleCloseType;
  contract: IContract;
  role: string;
}
interface DrawPosition {
  imageX: number;
  imageY: number;
  signX: number;
  signY: number;
}
const ContractSignatureModal = ({ open, handleClose, contract, role }: Props) => {
  const memberSignaturePosition: DrawPosition = {
    imageX: 477,
    imageY: 266,
    signX: 489,
    signY: 272,
  };
  const managerSignaturePosition: DrawPosition = {
    imageX: 477,
    imageY: 427,
    signX: 489,
    signY: 433,
  };
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
  const [signature, setSignature] = useState<URL | RequestInfo>('');

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
    ctx.lineWidth = 2;
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
    try {
      handleCapture();
    } catch (e) {
      console.error('Error capturing signature:', e);
    }
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

  const handleCombine = async () => {
    console.log(role);
    if (role !== 'USER' && role !== 'MANAGER') return;
    try {
      if (!signature) {
        window.alert('서명 이후 완료 버튼을 눌러주세요');
        return;
      }
      const pdfPreSignedUrl = await getContractFormPreSignedUrl(contract.contractNo);
      if (!pdfPreSignedUrl) {
        throw new Error('Failed to get PDF PreSignedUrl');
      }
      const pdfBlob = await getFileFromS3(pdfPreSignedUrl);
      if (!pdfBlob) {
        throw new Error('Failed to load PDF');
      }

      const pdfBytes = await pdfBlob.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const fontResponse = await fetch('/assets/NotoSansKR-Regular.ttf');
      if (!fontResponse.ok) {
        throw new Error('Failed to load font');
      }
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fontResponse.arrayBuffer();
      const font = await pdfDoc.embedFont(fontBytes);

      const imageResponse = await fetch(signature);
      if (!imageResponse.ok) {
        throw new Error('Failed to load image');
      }
      const imageBytes = await imageResponse.arrayBuffer();
      const image = await pdfDoc.embedPng(imageBytes);

      const pages = pdfDoc.getPages();
      const page = pages[1]; // 2번째 페이지를 가져옵니다. (0부터 시작합니다.)

      if (role === 'MANAGER') {
        page.drawImage(image, {
          x: managerSignaturePosition.imageX, // 이미지의 x 좌표
          y: managerSignaturePosition.imageY, // 이미지의 y 좌표
          width: 40, // 이미지의 가로 크기
          height: 20, // 이미지의 세로 크기
        });

        // 텍스트 추가
        page.drawText('(서명)', {
          x: managerSignaturePosition.signX,
          y: managerSignaturePosition.signY,
          size: 10,
          font: font,
          color: rgb(0, 0, 0),
        });
      } else if (role === 'USER') {
        page.drawImage(image, {
          x: memberSignaturePosition.imageX, // 이미지의 x 좌표
          y: memberSignaturePosition.imageY, // 이미지의 y 좌표
          width: 40, // 이미지의 가로 크기
          height: 20, // 이미지의 세로 크기
        });

        // 텍스트 추가
        page.drawText('(서명)', {
          x: memberSignaturePosition.signX,
          y: memberSignaturePosition.signY,
          size: 10,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      // 나머지 코드는 그대로 유지됩니다.
      // PDF 파일로 저장
      const modifiedPdfBytes = await pdfDoc.save();
      //pdf s3에 업로드
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'combined_pdf.pdf';
      link.click();
      const preSignedUrl = await signContract(contract.contractNo);
      if (preSignedUrl) await uploadFileToS3({ preSignedUrlToUpload: preSignedUrl, uploadFile: blob });
      window.alert('서명이 완료되었습니다.');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error loading PDF or image:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle}>
        <div style={{ border: '1px solid black' }}>
          <canvas
            ref={canvasRef}
            width={200}
            height={100}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          />
        </div>
        <Button onClick={handleCombine}>서명 완료</Button>
      </Box>
    </Modal>
  );
};

export default ContractSignatureModal;
