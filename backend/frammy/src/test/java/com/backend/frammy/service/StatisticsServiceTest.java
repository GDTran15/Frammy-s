package com.backend.frammy.service;

import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.repo.StatisticsRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StatisticsServiceTest {

    private StatisticsRepo statisticsRepo;
    private StatisticsService statisticsService;

    @BeforeEach
    void setUp() {
        statisticsRepo = Mockito.mock(StatisticsRepo.class);
        statisticsService = new StatisticsService(statisticsRepo);
    }

    @Test
    void testGetAllStatisticsReturnsNominees() {
        List<StatisticsResponseDTO> mockStats = List.of(
                new StatisticsResponseDTO(1L, "Best Artist", 50L),
                new StatisticsResponseDTO(2L, "Best Album", 40L)
        );

        when(statisticsRepo.getNomineePopularity()).thenReturn(mockStats);

        List<StatisticsResponseDTO> result = statisticsService.getAllStatistics();
        assertEquals(2, result.size());
        assertEquals("Best Artist", result.get(0).categoryName()); 
        assertEquals(50L, result.get(0).voteCount());
    }
}
