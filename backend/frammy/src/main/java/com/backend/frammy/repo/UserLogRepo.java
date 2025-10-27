package com.backend.frammy.repo;

import com.backend.frammy.model.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserLogRepo extends JpaRepository<UserLog, Long> {
    List<UserLog> findTop10ByOrderByTimestampDesc();
    List<UserLog> findByUserIdOrderByTimestampDesc(Long userId);
}
