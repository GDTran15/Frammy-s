package com.backend.frammy.dto;

import java.time.Instant;

public record VoteUsageDTO(

    long limit,
    long used,
    long remaining,
    Instant resetAt)
{}
