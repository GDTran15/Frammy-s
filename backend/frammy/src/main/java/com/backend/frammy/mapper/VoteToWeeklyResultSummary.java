package com.backend.frammy.mapper;

import com.backend.frammy.dto.WeeklyResultSummaryDTO;
import com.backend.frammy.model.Vote;
import org.springframework.stereotype.Component;

import java.util.function.Function;


//converts raw data and computes total votes
@Component
public class VoteToWeeklyResultSummary implements Function<WeeklyResultSummaryDTO, Vote> {

    private final long totalVotes;

    public VoteToWeeklyResultSummary(long totalVotes) {
        this.totalVotes = totalVotes;

    //INCOMPLETE
}