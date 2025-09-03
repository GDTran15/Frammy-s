package com.backend.frammy.repository;

import com.backend.frammy.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

//handles database access

@Repository
public interface VoteRepository  extends JpaRepository<Vote,Long> {
    List<Vote> findByWeek(LocalDate week);
 // put querys here
}