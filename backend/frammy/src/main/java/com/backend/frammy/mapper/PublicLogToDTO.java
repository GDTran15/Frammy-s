/*package com.backend.frammy.mapper;

import com.backend.frammy.dto.PublicLogDTO;
import com.backend.frammy.model.PublicLog;
import org.springframework.stereotype.Component;
import java.util.function.Function;

@Component
public class PublicLogToDTO implements Function<PublicLog, PublicLogDTO> {

    @Override
    public PublicLogDTO apply(PublicLog log) {
        return new PublicLogDTO(
                log.getId(),
                log.getUserName(),
                log.getTarget(),
                log.getTimestamp()
        );
    }
}
*/