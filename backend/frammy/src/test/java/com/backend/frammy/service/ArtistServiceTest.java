package com.backend.frammy.service;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.mapper.DtoToArtist;
import com.backend.frammy.model.Artist;

import com.backend.frammy.repo.ArtistRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ArtistServiceTest {
    @InjectMocks
    ArtistService artistService;
    @Mock
    ArtistRepo artistRepo;
    @Mock
    DtoToArtist dtoToArtist;

    @Test
    void createArtistTest(){
        System.out.println("MyFirst Unit text");

        CreateArtistRequestDTO createArtistRequestDTO =new CreateArtistRequestDTO(
                "SonTungMTP",
                "Vietnam Top1 Artist",
                "Billboard Award"
        );

        Artist artist = Artist.builder()
                .artistId(1L)
                        .artistName("SonTungMTP")
                                .artistInfo("VietNam Top1 Artist")
                                        .awards("Billboard Award")
                                                .build();

        Mockito.when(dtoToArtist.apply(createArtistRequestDTO)).thenReturn(artist);
        Mockito.when(artistRepo.save(artist)).thenReturn(artist);
        artistService.createArtist(createArtistRequestDTO);
        Assertions.assertEquals(1L,artist.getArtistId());
        Assertions.assertEquals("SonTungMTP",artist.getArtistName());


    }

}
