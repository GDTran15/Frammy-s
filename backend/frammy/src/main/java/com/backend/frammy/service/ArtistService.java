package com.backend.frammy.service;

import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.ArtistToDTO;
import com.backend.frammy.mapper.DtoToArtist;
import com.backend.frammy.model.Artist;

import com.backend.frammy.repo.ArtistRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final DtoToArtist dtoToArtist;
    private final ArtistRepo artistRepo;
    private final ArtistToDTO artistToDTO;


    @Transactional
    public void createArtist(@Valid CreateArtistRequestDTO createArtistRequestDTO) {
        if (artistRepo.existsByArtistName(createArtistRequestDTO.artistName())){// check if artist already exist or not
            throw new ObjectAlreadyExist("Artist already exist");
        }
        Artist newArtist = dtoToArtist.apply(createArtistRequestDTO);
        artistRepo.save(newArtist);
    }

    public List<ResponseGetArtistDTO> getAllArtist() {
        return artistRepo.findAll()
                .stream()
                .map(artistToDTO)
                .collect(Collectors.toList());
    }



    public void deleteArtist(Long artistId) {
        artistRepo.deleteById(artistId);
    }

    public Page<ResponseGetArtistDTO> getArtistInPage(Pageable pageable) {
        Page<Artist> artistPage = artistRepo.findAll(pageable);
        List<ResponseGetArtistDTO> artistListDTO = artistPage.stream().map(artistToDTO)// map list of artist to List of DTO
                .toList();

        return new PageImpl<>(artistListDTO,pageable,artistPage.getTotalElements());
    }

    public void updateArtist(Long artistId, @Valid CreateArtistRequestDTO createArtistRequestDTO) {
        Artist updateArtist = artistRepo.findByArtistId(artistId);
        updateArtist.setArtistName(createArtistRequestDTO.artistName());
        updateArtist.setArtistInfo(createArtistRequestDTO.artistInfo());
        updateArtist.setAwards(createArtistRequestDTO.awards());

    }


}
