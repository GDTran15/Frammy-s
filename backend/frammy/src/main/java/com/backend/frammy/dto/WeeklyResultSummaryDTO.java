package com.backend.frammy.dto;

import com.backend.frammy.model.NomineeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeeklyResultSummaryDTO {
    private NomineeType category; // ARTIST, ALBUM, or SONG
    private String winnerName; // Name of the winning artist/album/song
    private LocalDate date; // Date of the voting period
    private Long voteCount; // Total votes for the winner
}

