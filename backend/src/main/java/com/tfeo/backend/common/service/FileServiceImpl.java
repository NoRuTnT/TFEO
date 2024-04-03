package com.tfeo.backend.common.service;

import java.net.URL;
import java.util.Date;
import java.util.StringTokenizer;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.tfeo.backend.common.model.dto.FileNotExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 s3;

	/**
	 * 파일 업로드(PUT) presigned url 생성
	 * @return url
	 */
	@Override
	public String createPresignedUrlToUpload(String filePath) {
		String folder = new StringTokenizer(filePath, "/").nextToken() + "/";
		// s3에 해당 폴더가 존재하는 지 검증
		validateFileExists(folder);

		GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, filePath)
			.withMethod(HttpMethod.PUT)
			.withExpiration(getPreSignedUrlExpiration());
		generatePresignedUrlRequest.addRequestParameter(
			Headers.S3_CANNED_ACL,
			CannedAccessControlList.PublicRead.toString()
		);
		URL url = s3.generatePresignedUrl(generatePresignedUrlRequest);
		return url.toString();
	}

	/**
	 * 파일 다운로드(GET) presigned url 생성
	 * @return url
	 */
	public String createPresignedUrlToDownload(String filePath) {
		// s3에 파일이 저장되어 있는 지 검증
		validateFileExists(filePath);
		GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, filePath)
			.withMethod(HttpMethod.GET)
			.withExpiration(getPreSignedUrlExpiration());
		generatePresignedUrlRequest.addRequestParameter(
			Headers.S3_CANNED_ACL,
			CannedAccessControlList.PublicRead.toString()
		);
		URL url = s3.generatePresignedUrl(generatePresignedUrlRequest);
		return url.toString();
	}

	private void validateFileExists(String filePath) {
		try {
			s3.getObject(bucket, filePath);
		} catch (AmazonS3Exception e) {
			e.printStackTrace();
			throw new FileNotExistException(filePath);
		}
	}

	/**
	 * presigned url 유효 기간 설정
	 * @return 유효기간
	 */
	private Date getPreSignedUrlExpiration() {
		Date expiration = new Date();
		long expTimeMillis = expiration.getTime();
		expTimeMillis += 1000 * 60 * 2;
		expiration.setTime(expTimeMillis);
		return expiration;
	}

	/**
	 * 파일 경로 생성
	 * @param prefix 디렉토리 경로
	 * @return 파일의 전체 경로
	 */
	@Override
	public String createPath(String prefix) {
		String fileId = createFileId();
		return String.format("%s/%s", prefix, fileId);
	}

	@Override
	public S3Object getObject(String filePath) {
		S3Object s3Object = s3.getObject(bucket, filePath);
		return s3.getObject(bucket, filePath);
	}

	/**
	 * 파일 고유 ID 생성
	 * @return UUID
	 */
	private String createFileId() {
		return UUID.randomUUID().toString();
	}

}
