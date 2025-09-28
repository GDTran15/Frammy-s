package com.backend.frammy.dto;

import com.backend.frammy.model.NomineeType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record ResponseGetAllNomineeDTO(
        Long nomineeId,
        NomineeType nomineeType,
        String nomineeCategory,
        Long artistId,
        String artistName,
        String artistInfo,
        Long songId,
        String songName,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate songReleaseDate,
        String songGenre,
        Long albumId,
        String albumName,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate albumReleaseDate,
        String albumGenre
) {
}
