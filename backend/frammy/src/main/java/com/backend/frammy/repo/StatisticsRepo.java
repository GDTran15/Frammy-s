package com.backend.frammy.repo;

import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticsRepo extends JpaRepository<Vote, Long> {

    @Query("""
        SELECT new com.backend.frammy.dto.StatisticsResponseDTO(
            v.nominee.nomineeId,
            v.nominee.category.categoryName,
            COUNT(v)
        )
        FROM Vote v
        GROUP BY v.nominee.nomineeId, v.nominee.category.categoryName
        ORDER BY COUNT(v) DESC
    """)
    List<StatisticsResponseDTO> getNomineePopularity();
}
