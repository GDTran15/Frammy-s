package com.backend.frammy.repo;

import com.backend.frammy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findOptionByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByGmail(String gmail);

    @Query("select u.userId from User u  where u.username = ?1 ")
    Long findIdByUsername(String username);

    User findByUsername(String username);

    User findByUserId(Long userId);
}
