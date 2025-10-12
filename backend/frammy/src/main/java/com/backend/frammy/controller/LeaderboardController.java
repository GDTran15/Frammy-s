package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.LeaderboardEntryDTO;
import com.backend.frammy.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LeaderboardEntryDTO>>> get(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Long categoryId) {

        var data = leaderboardService.getTop(limit, categoryId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
