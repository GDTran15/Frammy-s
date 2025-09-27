package com.backend.frammy.controller;

import com.backend.frammy.dto.AddAlbumDTORequest;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.ResponseGetSongDTO;
import com.backend.frammy.service.AlbumService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("albums")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> addAlbum(@Valid @RequestBody AddAlbumDTORequest addAlbumDTORequest){
        albumService.createAlbum(addAlbumDTORequest);
        return ResponseEntity.ok(ApiResponse.success("Album successfully created"));
    }


//    @GetMapping()
//    public ResponseEntity<ApiResponse<List<ResponseGetSongDTO>>> getSongs(){
//        List<ResponseGetSongDTO> songList = albumService.getAllSongs();
//        return ResponseEntity.ok(ApiResponse.success(songList));
//    }
}
