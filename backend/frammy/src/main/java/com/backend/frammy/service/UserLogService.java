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
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserLogService {

    private final UserLogRepo userLogRepo;


    public UserLogResponseDTO createUserLog(UserLogRequestDTO dto) {
        UserLog log = new UserLog();
        log.setUserId(dto.userId());
        log.setUserName(dto.userName());
        log.setTarget(dto.target());

        log.setTimestamp(dto.timestamp() != null ? dto.timestamp() : LocalDateTime.now());

        userLogRepo.save(log);
        return UserLogToDTO.map(log);
    }

    public List<UserLogResponseDTO> getPublicLogs() {
        return userLogRepo.findTop10ByOrderByTimestampDesc()
                .stream()
                .map(log -> new UserLogResponseDTO(
                        log.getId(),
                        "Anonymous",  // hides username
                        log.getTarget(),
                        log.getTimestamp()
                ))
                .collect(Collectors.toList());
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

    public List<UserLogResponseDTO> getUserLogs(Long userId) {
        return userLogRepo.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(UserLogToDTO::map)
                .collect(Collectors.toList());
    }


}
