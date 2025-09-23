//package com.backend.frammy.controller;
//
//import com.backend.frammy.dto.ApiResponse;
//import com.backend.frammy.dto.CreateArtistRequestDTO;
//import com.backend.frammy.service.ArtistService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/artists")
//@RequiredArgsConstructor
//public class ArtistController {
//
//
//    private final ArtistService artistService;
//
//    @PostMapping()
//    public ResponseEntity<ApiResponse<String>> addArtist(@Valid @RequestBody CreateArtistRequestDTO createArtistRequestDTO){
//        artistService.createArtist(createArtistRequestDTO);
//        return ResponseEntity.ok(ApiResponse.success("Artist successfully create"));
//    }
//
//
//
//}
