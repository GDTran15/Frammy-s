package com.backend.frammy.controller;


import com.backend.frammy.dto.AddSongDTORequest;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.CreateArtistRequestDTO;
import com.backend.frammy.repo.SongRepo;
import com.backend.frammy.service.SongService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("songs")
@RestController
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addSong(@Valid @RequestBody AddSongDTORequest addSongDTORequest){
        songService.createSong(addSongDTORequest);
        return ResponseEntity.ok(ApiResponse.success("Artist successfully create"));
    }
}
