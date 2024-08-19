package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.entities.Message;

public interface MessageService {
	ApiResponse addNewMessage(Message msg);
	
	List<Message>  getMessages();

}
