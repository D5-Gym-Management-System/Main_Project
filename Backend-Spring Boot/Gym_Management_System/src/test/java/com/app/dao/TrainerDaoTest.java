//package com.app.dao;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import java.util.List;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.annotation.Rollback;
//
//import com.app.entities.Trainer;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = Replace.NONE)
//@Rollback(false)
//class TrainerDaoTest {
//
//	@Autowired
//	private TrainerDao deptDao;
//
//	@Test
//	void testSaveDepartments() {
//
//		List<Trainer> list = List.of(new Trainer("RnD", "Bangalore", null, null, null, null, null, null, null, 0, null, null),
//				new Trainer("Finance", "Mumbai"),
//				new Trainer("HR", "Delhi"),
//				new Trainer("Marketing", "Pune"));
//		List<Trainer> list2 = deptDao.saveAll(list);
//		assertEquals(4, list2.size());
//	}
//	@Test
//	void testSaveDepartments2() {
//
////		List<Trainer> list = List.of(
////				new Trainer("Production", "Indore"));
//		List<Trainer> list2 = deptDao.saveAll(list);
//		assertEquals(1, list2.size());
//	}
//
//}
