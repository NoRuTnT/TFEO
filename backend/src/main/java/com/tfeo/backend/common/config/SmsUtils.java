package com.tfeo.backend.common.config;

import java.io.File;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Component
public class SmsUtils {

	@Value("${coolsms.api.key}")
	private String apiKey;
	@Value("${coolsms.api.secret}")
	private String apiSecretKey;

	private DefaultMessageService messageService;

	@PostConstruct
	private void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
	}

	// 단일 메시지 발송 예제
	public SingleMessageSentResponse sendOne(String receiver, String text, File file) {
		Message message = new Message();
		// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
		message.setFrom("01089463856"); // Todo: 번호 발급받은 뒤 변경해야 한다.
		message.setTo(receiver);
		message.setText("[스물다섯 여든하나]" + text);
		if (file != null && file.exists()) {
			String imageId = this.messageService.uploadFile(file, StorageType.MMS, null);
			message.setImageId(imageId);
		}
		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
}
