package com.backend.frammy.dto;

import java.time.LocalDate;

public record AddSongDTORequest(
        String songName,
        LocalDate releaseDate,
        String songGenre,
        Long artistId

) {
}
