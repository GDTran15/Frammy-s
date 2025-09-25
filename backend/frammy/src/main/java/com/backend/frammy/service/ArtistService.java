//package com.backend.frammy.service;
//
//import com.backend.frammy.dto.CreateArtistRequestDTO;
//import com.backend.frammy.mapper.DtoToArtist;
//import com.backend.frammy.model.Artist;
//import com.backend.frammy.repository.ArtistRepository;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class ArtistService {
//
//    private final DtoToArtist dtoToArtist;
//    private final ArtistRepository artistRepo;
//
//    public void createArtist(@Valid CreateArtistRequestDTO createArtistRequestDTO) {
//        Artist newArtist = dtoToArtist.apply(createArtistRequestDTO);
//        artistRepo.save(newArtist);
//    }
//}
