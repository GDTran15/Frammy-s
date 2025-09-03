package com.backend.frammy.controller;

import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.WeeklyResultSummaryDTO;
import com.backend.frammy.service.WeeklyResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/weekly-results")
@RequiredArgsConstructor
public class WeeklyResultController {

    private final WeeklyResultService weeklyResultService;
    //Need to connect to service to get data
}

