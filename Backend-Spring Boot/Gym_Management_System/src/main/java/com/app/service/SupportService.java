package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.entities.Message;
import com.app.entities.Support;

public interface SupportService {
	ApiResponse addNewSupportMessage(Support msg);
	
	List<Support>  getsupportMessages();

}
