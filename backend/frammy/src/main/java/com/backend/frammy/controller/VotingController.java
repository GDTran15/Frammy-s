package com.backend.frammy.controller;

import com.backend.frammy.dto.VoteRequestDTO;
import com.backend.frammy.dto.VoteResponseDTO;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("vote")
public class VotingController {

    private final VoteService voteService;

    @PostMapping()
    public ResponseEntity<ApiResponse<VoteResponseDTO>>addVote(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody VoteRequestDTO voteRequestDTO) {

        voteService.createVote(voteRequestDTO, authorization);
        return ResponseEntity.ok(ApiResponse.success("Vote successfully created"));
    }

}
