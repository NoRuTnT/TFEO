import axios from 'axios';
import { S3UploadProps } from '../interfaces/S3Interface';

export const uploadPdfToS3 = async ({ preSignedUrlToUpload, uploadFile }: S3UploadProps) => {
  try {
    const response = await axios.put(preSignedUrlToUpload, uploadFile, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
    return response.data;
  } catch (e) {
    console.error('S3 업로드 중 오류 발생', e);
  }
};
