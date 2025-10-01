package com.backend.frammy.dto;

import java.time.LocalDate;

public record ResponseGetSongDTO (
        Long songId,
        String songName,
        LocalDate releaseDate,
        String genre
){
}
