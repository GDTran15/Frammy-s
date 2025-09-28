package com.backend.frammy.controller;


import com.backend.frammy.dto.*;
import com.backend.frammy.repo.SongRepo;
import com.backend.frammy.service.SongService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @GetMapping()
    public ResponseEntity<ApiResponse<List<ResponseGetSongDTO>>> getSongs(){
        List<ResponseGetSongDTO> songList = songService.getAllSongs();
        return ResponseEntity.ok(ApiResponse.success(songList));
    }
}
