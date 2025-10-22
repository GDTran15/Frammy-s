package com.backend.frammy.service;

import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.repo.StatisticsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepo statisticsRepo;

    public List<StatisticsResponseDTO> getAllStatistics() {
        return statisticsRepo.getNomineePopularity();
    }
}
