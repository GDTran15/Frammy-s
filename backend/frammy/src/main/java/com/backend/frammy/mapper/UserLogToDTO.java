package com.backend.frammy.mapper;

import com.backend.frammy.dto.UserLogResponseDTO;
import com.backend.frammy.model.UserLog;

public class UserLogToDTO {

    public static UserLogResponseDTO map(UserLog log) {
        return new UserLogResponseDTO(
                log.getId(),
                log.getUserName(),
                log.getTarget(),
                log.getTimestamp()
        );
    }
}
