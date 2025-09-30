package com.backend.frammy.mapper;

import com.backend.frammy.dto.ResponseGetSongDTO;
import com.backend.frammy.model.Song;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public  class SongToDTO implements Function<Song, ResponseGetSongDTO> {
    @Override
    public ResponseGetSongDTO apply(Song song) {
        return new ResponseGetSongDTO(
                song.getSongId(),
                song.getSongName(),
                song.getReleaseDate()
        );
    }
}
