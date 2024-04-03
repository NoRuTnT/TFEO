package com.tfeo.backend.common.service;

import java.io.InputStream;

public interface FileService {

	String createPresignedUrlToUpload(String filePath);
	String createPresignedUrlToDownload(String filePath);
	String createPath(String prefix) ;

	Object getObject(String filePath);

}
