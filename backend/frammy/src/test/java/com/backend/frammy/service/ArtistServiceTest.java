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
    @Mock
    ArtistToDTO artistToDTO;



    @Test
    void createArtist() {
        CreateArtistRequestDTO dto = new CreateArtistRequestDTO("MichaelTran", "Young boy", "No awards");
        Artist artist = new Artist();

        when(artistRepo.existsByArtistName(dto.artistName())).thenReturn(false);
        when(dtoToArtist.apply(dto)).thenReturn(artist);

        artistService.createArtist(dto);

        verify(artistRepo, times(1)).save(artist);
    }

    @Test
    void createArtist_alreadyExists() {
        CreateArtistRequestDTO dto = new CreateArtistRequestDTO("MichaelTran", "Young Boy", "No awards");

        when(artistRepo.existsByArtistName(dto.artistName())).thenReturn(true);

        assertThrows(ObjectAlreadyExist.class, () -> artistService.createArtist(dto));
        verify(artistRepo, never()).save(any());
    }

    @Test
    void getAllArtist() {
        Artist artist = Artist.builder()
                .artistId(1L)
                .artistName("MichaelTran")
                .build();

        when(artistRepo.findAll()).thenReturn(List.of(artist));
        when(artistToDTO.apply(artist)).thenReturn(new ResponseGetArtistDTO(1L, "MichaelTran", "Young Boy", "No awards"));

        List<ResponseGetArtistDTO> result = artistService.getAllArtist();

        assertEquals(1, result.size());
        assertEquals("MichaelTran", result.get(0).artistName());
    }

    @Test
    void deleteArtist() {
        Long id = 1L;
        artistService.deleteArtist(id);
        verify(artistRepo, times(1)).deleteById(id);
    }

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
