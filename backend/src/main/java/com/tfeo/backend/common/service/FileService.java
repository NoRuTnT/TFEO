package com.tfeo.backend.common.service;

public interface FileService {

	String createPresignedUrlToUpload(String filePath);
	String createPresignedUrlToDownload(String filePath);
	String createPath(String prefix, String fileName) ;
	String createFileId();

}
