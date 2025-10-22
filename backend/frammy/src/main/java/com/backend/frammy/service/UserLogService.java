package com.backend.frammy.service;

import com.backend.frammy.dto.UserLogRequestDTO;
import com.backend.frammy.dto.UserLogResponseDTO;
import com.backend.frammy.mapper.UserLogToDTO;
import com.backend.frammy.model.UserLog;
import com.backend.frammy.repo.UserLogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLogService {

    private final UserLogRepo userLogRepo;

    // Create new log
    public UserLogResponseDTO createUserLog(UserLogRequestDTO dto) {
        UserLog log = new UserLog();
        log.setUserName(dto.userName());
        log.setTarget(dto.target());
        log.setTimestamp(dto.timestamp());
        userLogRepo.save(log);
        return UserLogToDTO.map(log);
    }

    // Get paginated logs
    public Page<UserLogResponseDTO> getAllLogs(Pageable pageable) {
        return userLogRepo.findAll(pageable)
                .map(UserLogToDTO::map);
    }

    // Delete a log by ID
    public void deleteUserLog(Long id) {
        userLogRepo.deleteById(id);
    }
}
