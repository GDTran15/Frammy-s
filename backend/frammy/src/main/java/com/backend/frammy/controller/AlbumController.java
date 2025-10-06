package com.backend.frammy.controller;

import com.backend.frammy.dto.*;
import com.backend.frammy.service.AlbumService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
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

    @GetMapping()
    public ResponseEntity<ApiResponse<List<ResponseGetAlbumDTO>>> getAlbums(){
        List<ResponseGetAlbumDTO> albumList = albumService.getAlbums();
        return ResponseEntity.ok(ApiResponse.success(albumList));
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<PagedModel<ResponseGetAlbumDTO>>> getAllAlbumInPagination( // request param to define pagination page
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size
    )  {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResponseGetAlbumDTO> pagedModel = albumService.getAlbumInPage(pageable);
        return ResponseEntity.ok(ApiResponse.success(new PagedModel<>(pagedModel)));
    }

    @PutMapping("{albumId}")
    public ResponseEntity<ApiResponse<String>> updateAlbum(@Valid @RequestBody AddAlbumDTORequest addAlbumDTORequest, @PathVariable Long albumId ){
        albumService.updateAlbum(addAlbumDTORequest,albumId);
        return ResponseEntity.ok(ApiResponse.success("Album successfully updated"));
    }


}
