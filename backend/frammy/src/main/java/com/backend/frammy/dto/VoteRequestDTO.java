package com.backend.frammy.dto;

import jakarta.validation.constraints.NotNull;

public record VoteRequestDTO(

        @NotNull
        Long userId,
        Long nomineeId

) {
}
