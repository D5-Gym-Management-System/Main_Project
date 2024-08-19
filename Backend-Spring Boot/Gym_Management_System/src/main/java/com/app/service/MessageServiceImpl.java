package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MessageDao;
import com.app.dto.ApiResponse;
import com.app.entities.Message;

@Service
@Transactional
public class MessageServiceImpl  implements MessageService{

	@Autowired
	private MessageDao messagedao;
	
	@Override
	public ApiResponse addNewMessage(Message msg) {
		messagedao.save(msg);
		return new ApiResponse("message saved successfully");
	}

	@Override
	public List<Message> getMessages() {
		List<Message> msg=messagedao.findAll();
		return msg;
	}
	

}
