package com.backend.frammy.repo;

import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepo extends JpaRepository<Vote, Long> {

    boolean existsByUserIdAndNomineeId(Long userId, Long nomineeId);

    //long countByUser_UserId(Long userId);


}
