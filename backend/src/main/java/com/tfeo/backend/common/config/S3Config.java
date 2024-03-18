package com.tfeo.backend.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application-s3.yml")
@ConfigurationProperties(prefix = "aws")
public class S3Config {
	@Value("${credentials.accessKey}")
	private String accessKey;
	@Value("${credentials.secretKey}")
	private String secretKey;
	@Value("${region.static}")
	private String region;
}
