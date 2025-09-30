package com.backend.frammy.service;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.ArtistToDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

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

    @Test
    void getArtistInPage() {
        Artist artist = Artist.builder()
                        .artistId(1L)
                        .artistName("MichaelTran")
                        .build();


        Page<Artist> artistPage = new PageImpl<>(List.of(artist));
        Pageable pageable = PageRequest.of(0, 10);

        when(artistRepo.findAll(pageable)).thenReturn(artistPage);
        when(artistToDTO.apply(artist)).thenReturn(new ResponseGetArtistDTO(1L, "MichaelTran", "Young Boy", "No awards"));

        Page<ResponseGetArtistDTO> result = artistService.getArtistInPage(pageable);

        assertEquals(1, result.getTotalElements());
        assertEquals("MichaelTran", result.getContent().get(0).artistName());
    }

}
