package com.tfeo.backend.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
@PropertySource("classpath:application-s3.yml")
@ConfigurationProperties(prefix = "cloud.aws")
public class S3Config {
	@Value("${credentials.accessKey}")
	private String accessKey;
	@Value("${credentials.secretKey}")
	private String secretKey;
	@Value("${region.static}")
	private String region;
	@Bean
	@Primary
	public BasicAWSCredentials awsCredentialsProvider(){
		BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKey, secretKey);
		return basicAWSCredentials;
	}

	@Bean
	public AmazonS3 amazonS3() {
		AmazonS3 s3Builder = AmazonS3ClientBuilder.standard()
			.withRegion(region)
			.withCredentials(new AWSStaticCredentialsProvider(awsCredentialsProvider()))
			.build();
		return s3Builder;
	}
}
