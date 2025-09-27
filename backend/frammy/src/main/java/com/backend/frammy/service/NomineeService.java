package com.backend.frammy.service;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.*;
import com.backend.frammy.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NomineeService {

    private final NomineeRepo nomineeRepo;
    private final ArtistRepo artistRepo;
    private final AlbumRepo albumRepo;
    private final SongRepo songRepo;
    private final CategoryRepo categoryRepo;

    @Transactional
    public void createNewNominee(AddNomineeRequestDTO addNomineeRequestDTO) {
        Nominee nominee = new Nominee();
        Category category = categoryRepo.findByCategoryId(addNomineeRequestDTO.categoryId());
        boolean exist = false;
        if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ARTIST)) {
            Artist artist = artistRepo.findByArtistId(addNomineeRequestDTO.artistId());
            exist = nomineeRepo.existsByCategoryAndArtist(category,artist);
            nominee.setArtist(artist);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ALBUM)) {
           Album album = albumRepo.findByAlbumId(addNomineeRequestDTO.albumId());
           exist = nomineeRepo.existsByCategoryAndAlbum(category,album);
            nominee.setAlbum(album);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.SONG)) {
           Song song = songRepo.findBySongId(addNomineeRequestDTO.songId());
            exist = nomineeRepo.existsByCategoryAndSong(category,song);
            nominee.setSong(song);
        }

        if (exist) {
            throw new ObjectAlreadyExist("Nominee already exist in this category");
        }

        nominee.setCategory(category);
        nominee.setNomineeType(addNomineeRequestDTO.nomineeType());
        nomineeRepo.save(nominee);
    }
}
