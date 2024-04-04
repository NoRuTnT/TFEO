package com.tfeo.backend.common.service;

import com.amazonaws.services.s3.model.S3Object;

public interface FileService {

	String createPresignedUrlToUpload(String filePath);

	String createPresignedUrlToDownload(String filePath);

	String createPath(String prefix);

	S3Object getObject(String filePath);

}
