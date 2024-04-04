package com.tfeo.backend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000", "https://j10a707.p.ssafy.io", "http://j10a707.p.ssafy.io",
				"https://j10a707.p.ssafy.io:3000")
			.allowedMethods("GET", "POST", "PUT", "DELETE")
			.allowedHeaders("*");
	}
}
