package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;


@MappedSuperclass // to tell hib , not to create any tables n other entities will extend from it
@Getter
@Setter
public class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	@Version
	private Long version;
	
	//----------------------------------------------
	
	/*
	 * public Long getId() { return id; } public void setId(Long id) { this.id = id;
	 * } public Long getVersion() { return version; } public void setVersion(Long
	 * version) { this.version = version; }
	 */
	
	//--------------------------------------------
}
