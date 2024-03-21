package com.tfeo.backend.common.service;

public interface FileService {

	String createPresignedUrlToUpload(String prefix);
	String createPresignedUrlToDownload(String prefix);

}
