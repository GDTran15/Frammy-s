package com.backend.frammy.repo;

import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//import java.awt.print.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.Instant;
import java.util.List;

public interface VoteRepo extends JpaRepository<Vote, Long> {

    //boolean existsByUser_UserIdAndNominee_NomineeId(Long userId, Long nomineeId);

    long countByUser_UserIdAndCreatedAtBetween(Long userId, Instant start, Instant end);

    interface VoteCount {
        Long getNomineeId();
        Long getVotes();
    }

    @Query(value = """
        SELECT v.nominee.nomineeId as nomineeId, COUNT(v) AS votes
        FROM Vote v
        GROUP BY v.nominee.nomineeId
        ORDER BY COUNT(v) DESC
    """)
    List<VoteCount> aggregateCounts(Pageable pageable);

    @Query(value = """
        SELECT v.nominee.nomineeId AS nomineeId, COUNT(v) AS votes
        FROM Vote v
        WHERE v.nominee.category.categoryId = :categoryId
        GROUP BY v.nominee.nomineeId
        ORDER BY COUNT(v) DESC
    """)
    List<VoteCount> aggregateCountsByCategory(@Param("categoryId") Long categoryId, Pageable pageable);

}
