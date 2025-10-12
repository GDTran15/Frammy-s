package com.backend.frammy.dto;

import com.backend.frammy.model.NomineeType;

public record LeaderboardEntryDTO(

    Long nomineeId,
    NomineeType nomineeType,
    String displayName,
    Long votes,
    Integer rank
) {}
