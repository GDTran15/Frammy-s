package com.backend.frammy.service;

import com.backend.frammy.dto.UserLogRequestDTO;
import com.backend.frammy.dto.UserLogResponseDTO;
import com.backend.frammy.model.UserLog;
import com.backend.frammy.repo.UserLogRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserLogServiceTest {

    private UserLogRepo userLogRepo;
    private UserLogService userLogService;

    @BeforeEach
    void setUp() {
        userLogRepo = Mockito.mock(UserLogRepo.class);
        userLogService = new UserLogService(userLogRepo);
    }

    @Test
    void testCreateUserLog() {
        UserLogRequestDTO dto = new UserLogRequestDTO(1L, "Elijah", "Voted for Taylor Swift", LocalDateTime.now());
        UserLog saved = UserLog.builder()
                .id(1L)
                .userName(dto.userName())
                .target(dto.target())
                .timestamp(dto.timestamp())
                .build();

        when(userLogRepo.save(any(UserLog.class))).thenReturn(saved);

        UserLogResponseDTO response = userLogService.createUserLog(dto);

        assertEquals("Elijah", response.userName());
        assertEquals("Voted for Taylor Swift", response.target());
        assertNotNull(response.timestamp());
    }

    @Test
    void testGetAllLogsReturnsPage() {
        var pageable = PageRequest.of(0, 10);
        var log = new UserLog(1L, 1L, "Elijah", "Voted for Drake", LocalDateTime.now());
        var page = new PageImpl<>(List.of(log));

        when(userLogRepo.findAll(pageable)).thenReturn(page);

        Page<UserLogResponseDTO> result = userLogService.getAllLogs(pageable);

        assertFalse(result.isEmpty());
        assertEquals("Elijah", result.getContent().get(0).userName());
        assertEquals("Voted for Drake", result.getContent().get(0).target());
    }
}
