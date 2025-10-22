package com.backend.frammy.mapper;

import com.backend.frammy.dto.StatisticsResponseDTO;
import com.backend.frammy.model.Nominee;

public class StatisticsToDTO {

    public static StatisticsResponseDTO map(Nominee nominee, long voteCount) {
        return new StatisticsResponseDTO(
                nominee.getNomineeId(),
                nominee.getCategory().getCategoryName(),
                voteCount
        );
    }
}
