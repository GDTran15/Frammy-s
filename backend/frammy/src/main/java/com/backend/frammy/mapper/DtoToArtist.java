package com.backend.frammy.mapper;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.model.Artist;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class DtoToArtist implements Function<CreateArtistRequestDTO, Artist> {


    @Override
    public Artist apply(CreateArtistRequestDTO createArtistRequestDTO) {
        return Artist.builder()
                .artistName(createArtistRequestDTO.artistName())
                .artistInfo(createArtistRequestDTO.artistInfo())
                .awards(createArtistRequestDTO.awards())
                .build();
    }
}
