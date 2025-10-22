package com.backend.frammy.controller;

import com.backend.frammy.dto.*;
import com.backend.frammy.service.ArtistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
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



    @DeleteMapping("/{artistId}")
    public ResponseEntity<ApiResponse<String>> deleteArtist(@PathVariable Long artistId){
        artistService.deleteArtist(artistId);
        return ResponseEntity.ok(ApiResponse.success("delete success"));
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<PagedModel<ResponseGetArtistDTO>>> getAllArtistInPagination(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size,
            @RequestParam(value = "search", defaultValue = "") String search
    )  {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResponseGetArtistDTO> pagedModel = artistService.getArtistInPages(pageable,search);
        return ResponseEntity.ok(ApiResponse.success(new PagedModel<>(pagedModel)));
    }

    @PutMapping("/{artistId}")
    public ResponseEntity<ApiResponse<String>> updateArtist(@PathVariable Long artistId, @Valid @RequestBody CreateArtistRequestDTO createArtistRequestDTO )
    {
        artistService.updateArtist(artistId,createArtistRequestDTO);
        return ResponseEntity.ok(ApiResponse.success("Artist successfully update"));

    }


}
