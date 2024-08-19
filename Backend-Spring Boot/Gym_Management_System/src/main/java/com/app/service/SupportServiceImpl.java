package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MessageDao;
import com.app.dao.SupportDao;
import com.app.dto.ApiResponse;
import com.app.entities.Message;
import com.app.entities.Support;

@Service
@Transactional
public class SupportServiceImpl  implements SupportService{

	@Autowired
	private SupportDao supportdao;
	
	

	@Override
	public ApiResponse addNewSupportMessage(Support msg) {
		supportdao.save(msg);
		return new ApiResponse("support message saved successfully");
	
	}

	@Override
	public List<Support> getsupportMessages() {
		List<Support> msg=supportdao.findAll();
		return msg;
	}
	

}
