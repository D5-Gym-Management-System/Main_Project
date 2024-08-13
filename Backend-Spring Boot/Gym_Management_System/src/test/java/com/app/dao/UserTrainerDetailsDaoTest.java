package com.app.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.app.entities.Trainer;
import com.app.entities.Membership;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
class UserTrainerDetailsDaoTest {
	@Autowired
	private UserTrainerDetailsDao dao;

	@Test
	void testFindByProjectId() {
		List<Trainer> list = dao.findByTrain(1l);
		list.forEach(System.out::println);
		assertEquals(2,list.size());
	}
	
	@Test
	void testFindByEmpId() {
		List<Membership> list = dao.findByUserId(2l);
		list.forEach(System.out::println);
		assertEquals(2,list.size());
	}

}
