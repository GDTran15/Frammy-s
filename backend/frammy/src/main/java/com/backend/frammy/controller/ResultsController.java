
package com.backend.frammy.controller;

import com.backend.frammy.dto.WeeklyResultSummaryDTO;
import com.backend.frammy.model.NomineeType;
import com.backend.frammy.repo.NomineeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResultsController {

    private final NomineeRepo nomineeRepo;

    // Get only winners (one per category)
    @GetMapping("/weekly-summary")
    public ResponseEntity<List<WeeklyResultSummaryDTO>> getWeeklyResultSummary() {
        List<Object[]> results = nomineeRepo.findWeeklyResultSummary();

        List<WeeklyResultSummaryDTO> dtoList = results.stream()
                .map(row -> {
                    WeeklyResultSummaryDTO dto = new WeeklyResultSummaryDTO();
                    dto.setCategory(NomineeType.valueOf((String) row[0]));
                    dto.setWinnerName((String) row[1]);

                    if (row[2] instanceof Date) {
                        dto.setDate(((Date) row[2]).toLocalDate());
                    } else if (row[2] instanceof java.util.Date) {
                        dto.setDate(new java.sql.Date(((java.util.Date) row[2]).getTime()).toLocalDate());
                    } else {
                        dto.setDate(LocalDate.now());
                    }

                    if (row[3] instanceof BigInteger) {
                        dto.setVoteCount(((BigInteger) row[3]).longValue());
                    } else if (row[3] instanceof Long) {
                        dto.setVoteCount((Long) row[3]);
                    } else if (row[3] instanceof Integer) {
                        dto.setVoteCount(((Integer) row[3]).longValue());
                    } else {
                        dto.setVoteCount(0L);
                    }

                    return dto;
                })
                .collect(Collectors.toList());

        // Group by category and get winner (max votes) for each
        Map<NomineeType, WeeklyResultSummaryDTO> winnersMap = dtoList.stream()
                .collect(Collectors.groupingBy(
                        WeeklyResultSummaryDTO::getCategory,
                        Collectors.collectingAndThen(
                                Collectors.maxBy(Comparator.comparing(WeeklyResultSummaryDTO::getVoteCount)),
                                Optional::get
                        )
                ));

        List<WeeklyResultSummaryDTO> winners = new ArrayList<>(winnersMap.values());

        return ResponseEntity.ok(winners);
    }

    // Get ALL nominees with their vote counts
    @GetMapping("/all-votes")
    public ResponseEntity<List<WeeklyResultSummaryDTO>> getAllVotes() {
        List<Object[]> results = nomineeRepo.findWeeklyResultSummary();

        List<WeeklyResultSummaryDTO> dtoList = results.stream()
                .map(row -> {
                    WeeklyResultSummaryDTO dto = new WeeklyResultSummaryDTO();
                    dto.setCategory(NomineeType.valueOf((String) row[0]));
                    dto.setWinnerName((String) row[1]);

                    if (row[2] instanceof Date) {
                        dto.setDate(((Date) row[2]).toLocalDate());
                    } else if (row[2] instanceof java.util.Date) {
                        dto.setDate(new java.sql.Date(((java.util.Date) row[2]).getTime()).toLocalDate());
                    } else {
                        dto.setDate(LocalDate.now());
                    }

                    if (row[3] instanceof BigInteger) {
                        dto.setVoteCount(((BigInteger) row[3]).longValue());
                    } else if (row[3] instanceof Long) {
                        dto.setVoteCount((Long) row[3]);
                    } else if (row[3] instanceof Integer) {
                        dto.setVoteCount(((Integer) row[3]).longValue());
                    } else {
                        dto.setVoteCount(0L);
                    }

                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}

