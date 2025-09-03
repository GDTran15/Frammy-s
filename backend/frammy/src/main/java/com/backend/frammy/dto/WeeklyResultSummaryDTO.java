package com.backend.frammy.dto;

//WOULD NEED TO WORK IN COLABORATION WITH VOTE-DTO for feature as a whole

//Defines data that will be sent to frontend
public record WeeklyResultSummaryDTO()
    string category,
    string nominee,
    long totalVotes,
({}