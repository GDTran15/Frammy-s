package com.backend.frammy.service;

import com.backend.frammy.dto.AddNomineeRequestDTO;
import com.backend.frammy.dto.ResponseGetAllNomineeDTO;
import com.backend.frammy.exception.InvalidInputException;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.model.*;
import com.backend.frammy.repo.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        setDataIntoNominee(addNomineeRequestDTO,nominee);
        nomineeRepo.save(nominee);
    }

    public Page<ResponseGetAllNomineeDTO> getNominees(Pageable pageable) {
        return nomineeRepo.findAllNominateWithInformation(pageable);
    }

    public void deleteNominee(Long nomineeId) {
        nomineeRepo.deleteById(nomineeId);
    }

    public void updateNominee(@Valid AddNomineeRequestDTO addNomineeRequestDTO, Long nomineeId) {
       Nominee nominee =  nomineeRepo.findByNomineeId(nomineeId);
       setDataIntoNominee(addNomineeRequestDTO,nominee);

        nomineeRepo.save(nominee);
    }

    private void setDataIntoNominee(AddNomineeRequestDTO addNomineeRequestDTO, Nominee nominee){
        Category category = categoryRepo.findByCategoryId(addNomineeRequestDTO.categoryId());

        boolean exist = false;
        if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ARTIST)) {
            if (addNomineeRequestDTO.artistId() == null) {
                throw new InvalidInputException();
            }
            Artist artist = artistRepo.findByArtistId(addNomineeRequestDTO.artistId());
            exist = nomineeRepo.existsByCategoryAndArtist(category,artist);
            nominee.setArtist(artist);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.ALBUM)) {
            if (addNomineeRequestDTO.albumId() == null) {
                throw new InvalidInputException();
            }
            Album album = albumRepo.findByAlbumId(addNomineeRequestDTO.albumId());
            exist = nomineeRepo.existsByCategoryAndAlbum(category,album);
            nominee.setAlbum(album);
        } else if (addNomineeRequestDTO.nomineeType().equals(NomineeType.SONG)) {
            if (addNomineeRequestDTO.songId() == null) {
                throw new InvalidInputException();
            }
            Song song = songRepo.findBySongId(addNomineeRequestDTO.songId());
            exist = nomineeRepo.existsByCategoryAndSong(category,song);
            nominee.setSong(song);
        }

        if (exist) {
            throw new ObjectAlreadyExist("Nominee already exist in this category");
        }

        nominee.setCategory(category);
        nominee.setNomineeType(addNomineeRequestDTO.nomineeType());
    }
}
