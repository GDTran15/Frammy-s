package com.backend.frammy.controller;

import com.backend.frammy.dto.WeeklyResultSummaryDTO;
import com.backend.frammy.model.NomineeType;
import com.backend.frammy.repo.NomineeRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import java.math.BigInteger;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ResultsControllerSimpleTest {

    @Test
    void getWeeklyResultSummary_ShouldReturnWinners() {
        // Mock the repository
        NomineeRepo repo = Mockito.mock(NomineeRepo.class);

        Object[] artistWinner = new Object[]{"ARTIST", "Ed Sheeran", Date.valueOf(LocalDate.now()), BigInteger.valueOf(5)};
        Object[] albumWinner = new Object[]{"ALBUM", "Midnights", Date.valueOf(LocalDate.now()), BigInteger.valueOf(7)};
        Object[] songWinner = new Object[]{"SONG", "Anti-Hero", Date.valueOf(LocalDate.now()), BigInteger.valueOf(6)};

        Mockito.when(repo.findWeeklyResultSummary())
                .thenReturn(List.of(artistWinner, albumWinner, songWinner));

        // Create controller with mocked repo
        ResultsController controller = new ResultsController(repo);

        // Call method
        ResponseEntity<List<WeeklyResultSummaryDTO>> response = controller.getWeeklyResultSummary();

        // Assertions
        assertEquals(3, response.getBody().size());
        assertTrue(response.getBody().stream().anyMatch(d -> d.getCategory() == NomineeType.ARTIST && d.getWinnerName().equals("Ed Sheeran")));
        assertTrue(response.getBody().stream().anyMatch(d -> d.getCategory() == NomineeType.ALBUM && d.getWinnerName().equals("Midnights")));
        assertTrue(response.getBody().stream().anyMatch(d -> d.getCategory() == NomineeType.SONG && d.getWinnerName().equals("Anti-Hero")));
    }
}
