package com.tfeo.backend.common.service;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

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
	 * @param prefix 폴더 이름
	 * @param fileName s3 업로드 파일 이름
	 * @return url
	 */
	@Override
	public String createPresignedUrlToUpload(String prefix, String fileName) {
		String filePath = createPath(prefix, fileName);
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
	 * @param prefix 폴더 이름
	 * @param fileName s3 다운로드 파일 이름
	 * @return url
	 */
	public String createPresignedUrlToDownload(String prefix, String fileName) {
		String filePath = createPath(prefix, fileName);
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
	 * @param fileName  파일 이름
	 * @return 파일의 전체 경로
	 */
	private String createPath(String prefix, String fileName) {
		String fileId = createFileId();
		return String.format("%s/%s", prefix, fileName);
	}

	/**
	 * 파일 고유 ID 생성
	 * @return UUID
	 */
	private String createFileId() {
		return UUID.randomUUID().toString();
	}

}