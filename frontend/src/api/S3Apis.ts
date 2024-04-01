import axios from 'axios';
import { S3UploadProps } from '../interfaces/S3Interface';

export const uploadFileToS3 = async ({ preSignedUrlToUpload, uploadFile }: S3UploadProps) => {
  try {
    const contentType = uploadFile.type;
    const response = await axios.put(preSignedUrlToUpload, uploadFile, {
      headers: {
        'Content-Type': contentType,
      },
    });
    console.log('S3 upload finished');
    return response.data;
  } catch (e) {
    console.error('S3 업로드 중 오류 발생', e);
  }
};

export const getFileFromS3 = async (preSignedUrlToDownload: string) => {
  try {
    const response = await axios.get(preSignedUrlToDownload, {
      responseType: 'blob',
    });
    console.log('S3 Download finished');
    return response.data as Blob;
  } catch (e) {
    console.error('S3 다운로드 중 오류 발생', e);
  }
};
