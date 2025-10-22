package com.backend.frammy.repo;

import com.backend.frammy.model.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLogRepo extends JpaRepository<UserLog, Long> {
}
