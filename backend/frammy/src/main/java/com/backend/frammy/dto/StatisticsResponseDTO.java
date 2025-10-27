package com.backend.frammy.dto;



public record StatisticsResponseDTO(
        Long nomineeId,
        String categoryName,
        Long voteCount
) {
}
