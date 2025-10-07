package com.backend.frammy.service;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.*;
import com.backend.frammy.repo.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NomineeServiceTest {
    @Mock
    private NomineeRepo nomineeRepo;
    @Mock
    private ArtistRepo artistRepo;
    @Mock
    private AlbumRepo albumRepo;
    @Mock
    private SongRepo songRepo;
    @Mock
    private CategoryRepo categoryRepo;

    @InjectMocks
    private NomineeService nomineeService;

    @Mock
    private Category category;

    @BeforeEach
    void setup() {
        category = new Category();
        category.setCategoryId(1L);
        lenient().when(categoryRepo.findByCategoryId(1L)).thenReturn(category);    }

    @Test
    void createNewNominee_success() {
        Artist artist = new Artist();
        artist.setArtistId(2L);
        when(artistRepo.findByArtistId(2L)).thenReturn(artist);
        when(nomineeRepo.existsByCategoryAndArtist(category, artist)).thenReturn(false);

        AddNomineeRequestDTO dto = new AddNomineeRequestDTO(
                category.getCategoryId(), 2L, null, null, NomineeType.ARTIST);

        nomineeService.createNewNominee(dto);

        verify(nomineeRepo, times(1)).save(any(Nominee.class));
    }

    @Test
    void createNewNominee_alreadyExist_shouldThrowObjectAlreadyExist() {
        Artist artist = new Artist();
        artist.setArtistId(2L);
        when(artistRepo.findByArtistId(2L)).thenReturn(artist);
        when(nomineeRepo.existsByCategoryAndArtist(category, artist)).thenReturn(true);

        AddNomineeRequestDTO dto = new AddNomineeRequestDTO(
                category.getCategoryId(), 2L,    null,    null, NomineeType.ARTIST);

        assertThrows(ObjectAlreadyExist.class, () -> nomineeService.createNewNominee(dto));
    }

    @Test
    void createNewNominee_withAlbum_success() {
        Album album = new Album();
        album.setAlbumId(1L);
        when(albumRepo.findByAlbumId(1L)).thenReturn(album);
        when(nomineeRepo.existsByCategoryAndAlbum(category, album)).thenReturn(false);

        AddNomineeRequestDTO dto = new AddNomineeRequestDTO(
                category.getCategoryId(), null, null, 1L, NomineeType.ALBUM);

        nomineeService.createNewNominee(dto);

        verify(nomineeRepo, times(1)).save(any(Nominee.class));
    }

    @Test
    void createNewNominee_withSong_success() {
        Song song = new Song();
        song.setSongId(1L);
        when(songRepo.findBySongId(1L)).thenReturn(song);
        when(nomineeRepo.existsByCategoryAndSong(category, song)).thenReturn(false);

        AddNomineeRequestDTO dto = new AddNomineeRequestDTO(
                1L, null, 1L, null, NomineeType.SONG);

        nomineeService.createNewNominee(dto);

        verify(nomineeRepo, times(1)).save(any(Nominee.class));
    }

    @Test
    void getNominees() {
        Page<ResponseGetAllNomineeDTO> page = new PageImpl<>(List.of(new ResponseGetAllNomineeDTO(1L,
                NomineeType.ARTIST,
                1L,
                "Best Artist",
                category.getCategoryId(),
                "MichaelTran",
                "Young Boy",
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null             )));
        when(nomineeRepo.findAllNominateWithInformation(any(PageRequest.class), categoryId)).thenReturn(page);

        Page<ResponseGetAllNomineeDTO> result = nomineeService.getNominees(PageRequest.of(0, 5), categoryId);

        assertThat(result.getContent()).hasSize(1);
        verify(nomineeRepo).findAllNominateWithInformation(any(PageRequest.class), categoryId);
    }

    @Test
    void testDeleteNominee() {
        nomineeService.deleteNominee(1L);
        verify(nomineeRepo).deleteById(1L);
    }

    @Test
    void testUpdateNominee() {
        Nominee nominee = new Nominee();
        nominee.setNomineeId(1L);

        when(nomineeRepo.findByNomineeId(1L)).thenReturn(nominee);
        Artist artist = new Artist();
        artist.setArtistId(1L);
        when(artistRepo.findByArtistId(1L)).thenReturn(artist);

        AddNomineeRequestDTO dto = new AddNomineeRequestDTO(
                category.getCategoryId(), 1L, null, null, NomineeType.ARTIST);

        nomineeService.updateNominee(dto, 1L);

        verify(nomineeRepo).save(any(Nominee.class));
    }
}
