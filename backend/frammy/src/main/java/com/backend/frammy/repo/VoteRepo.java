package com.backend.frammy.repo;

import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepo extends JpaRepository<Vote, Long> {

    boolean existsByUser_UserIdAndNominee_NomineeId(Long userId, Long nomineeId);

    long countByUser_UserId(Long userId);


}
