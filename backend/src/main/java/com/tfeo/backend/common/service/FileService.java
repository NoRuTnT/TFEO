package com.tfeo.backend.common.service;

public interface FileService {

	String createPresignedUrlToUpload(String prefix, String fileName);
	String createPresignedUrlToDownload(String prefix, String fileName);

}
