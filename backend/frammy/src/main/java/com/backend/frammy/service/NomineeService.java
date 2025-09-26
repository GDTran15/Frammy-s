package com.backend.frammy.service;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.model.Category;
import com.backend.frammy.model.Nominee;
import com.backend.frammy.model.NomineeType;
import com.backend.frammy.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NomineeService {

    private final NomineeRepo nomineeRepo;
    private final ArtistRepo artistRepo;
    private final AlbumRepo albumRepo;
    private final SongRepo songRepo;
    private final CategoryRepo categoryRepo;


    public void createNewNominee(AddNomineeRequestDTO addNomineeRequestDTO) {
        Nominee nominee = new Nominee();
        if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ARTIST)) {
            artistRepo.findByArtistId(addNomineeRequestDTO.artistId())
                    .ifPresent(nominee::setArtist);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ALBUM)) {
            albumRepo.findByAlbumId(addNomineeRequestDTO.albumId()).ifPresent(nominee::setAlbum);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.SONG)) {
            songRepo.findBySongId(addNomineeRequestDTO.songId()).ifPresent(nominee::setSong);
        }
        nominee.setCategory(categoryRepo.findByCategoryId(addNomineeRequestDTO.categoryId()));
        nominee.setNomineeType(addNomineeRequestDTO.nomineeType());
        nomineeRepo.save(nominee);
    }
}
