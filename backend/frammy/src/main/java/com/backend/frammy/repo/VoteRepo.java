package com.backend.frammy.repo;

import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;

public interface VoteRepo extends JpaRepository<Vote, Long> {

    boolean existsByUser_UserIdAndNominee_NomineeId(Long userId, Long nomineeId);

    long countByUser_UserIdAndCreatedAtBetween(Long userId, Instant start, Instant end);

}
