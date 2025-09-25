package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.dto.ResponseGetArtistDTO;
import com.backend.frammy.dto.UpdateArtistRequestDTO;
import com.backend.frammy.service.ArtistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
public class ArtistController {


    private final ArtistService artistService;

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addArtist(@Valid @RequestBody CreateArtistRequestDTO createArtistRequestDTO){
        artistService.createArtist(createArtistRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("Artist successfully create"));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<ResponseGetArtistDTO>>> getArtists(){
        List<ResponseGetArtistDTO> artistList = artistService.getAllArtist();
        return ResponseEntity.ok(ApiResponse.success(artistList));
    }

    @PutMapping("/{artistId}")
    public ResponseEntity<ApiResponse<String>> updateArtist(@PathVariable Long artistId, @RequestBody @Valid UpdateArtistRequestDTO updateArtistRequestDTO){
        artistService.updateArtist(artistId,updateArtistRequestDTO);
        return  ResponseEntity.ok(ApiResponse.success("success"));
    }

    @DeleteMapping("/{artistId}")
    public ResponseEntity<ApiResponse<String>> deleteArtist(@PathVariable Long artistId){
        artistService.deleteArtist(artistId);
        return ResponseEntity.ok(ApiResponse.success("delete success"));
    }





}
