package com.backend.frammy.dto;

import com.backend.frammy.model.NomineeType;
import jakarta.validation.constraints.NotNull;

public record AddNomineeRequestDTO(
    @NotNull
    Long categoryId,
    Long artistId,
    Long songId,
    Long albumId,
    @NotNull
    NomineeType nomineeType
) {
}
