package com.backend.frammy.controller;


import com.backend.frammy.dto.*;
import com.backend.frammy.repo.SongRepo;
import com.backend.frammy.service.SongService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
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

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<PagedModel<ResponseGetSongDTO>>> getAllSongInPagination(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size
    )  {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResponseGetSongDTO> pagedModel = songService.getSongInPage(pageable);
        return ResponseEntity.ok(ApiResponse.success(new PagedModel<>(pagedModel)));
    }

    @DeleteMapping("{songId}")
    public ResponseEntity<ApiResponse<String>> deleteSong(@PathVariable Long songId){
        songService.deleteSong(songId);
        return ResponseEntity.ok(ApiResponse.success("delete success"));
    }
}
