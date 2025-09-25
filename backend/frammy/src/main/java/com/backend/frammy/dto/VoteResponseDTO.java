package com.backend.frammy.dto;

public record VoteResponseDTO(

        Long voteId,
        Long nomineeId,
        Long userId

) {
}
