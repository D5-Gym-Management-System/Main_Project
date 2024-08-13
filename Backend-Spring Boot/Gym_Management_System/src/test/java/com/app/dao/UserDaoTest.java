package com.app.dao;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;


import com.app.entities.Trainer;
import com.app.entities.Trainer;
import com.app.entities.TrainerType;
import com.app.entities.Users;
import com.app.entities.MembershipType;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
class UserDaoTest {
	@Autowired
	private UserDao dao;
	@Autowired
	private TrainerDao deptDao;

	@Test
	void testSaveEmps() {
		/*
		 * firstName, String lastName, String email, String password, LocalDate
		 * joinDate, EmploymentType empType, double salary
		 */
		Trainer dept = deptDao.findById(1L).orElseThrow();
		List<Users> list = List.of(
				new Users("bibek","modak", "bibek@gmail.com", "1234", LocalDate.now(), MembershipType.GOLD, 600),
				new Users("hritik", "thakur", "hritik@gmail.com", "def#2345", LocalDate.parse("2024-02-02"),
						MembershipType.PLATINUM, 478),
				new Users("vedant", "kulkarni", "vedant@gmail.com", "xyz#1245", LocalDate.parse("2024-01-01"),
						MembershipType.SILVER, 678));
		// establish bi dir asso bet dept n emps
		list.forEach(e -> {
			e.setCard(new AdhaarCard(randomAlphanumeric(12), "Pune", LocalDate.parse("2019-01-01")));
			dept.addUser(e);//setting up bi di asso
		});
		List<Users> list2 = dao.saveAll(list);
//		List<Address> adrList = List.of(
//				new Address("Tilak Rd", "Pune", "MH", "India", "411020"),
//				new Address("M G Rd", "Bangalore", "KA", "India", "566020"),
//				new Address("Laxmi Rd", "Pune", "MH", "India", "411001"));
//		assertEquals(3, list2.size());
			
	}

}
