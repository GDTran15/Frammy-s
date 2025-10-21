/* package com.backend.frammy.mapper;

import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.model.Statistics;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class StatisticsToDTO implements Function<Statistics, StatisticsResponseDTO> {
    @Override
    public StatisticsResponseDTO apply(Statistics statistics) {
        return new StatisticsResponseDTO(
                statistics.getId(),
                statistics.getNomineeId(),
                statistics.getPopularityScore()
        );
    }
}
*/