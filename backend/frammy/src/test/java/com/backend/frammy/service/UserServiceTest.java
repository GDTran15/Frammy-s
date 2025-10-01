package com.backend.frammy.service;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.dto.UserResponseDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.DTOToUser;
import com.backend.frammy.mapper.UserToDTO;
import com.backend.frammy.model.User;

import com.backend.frammy.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @InjectMocks
    UserService userService;
    @Mock
    UserRepo userRepo;
    @Mock
    DTOToUser dtoToUser;
    @Mock
    UserToDTO userToDTO;


    @Test
    void createUser() {
        RegisterRequestDTO dto = new RegisterRequestDTO("test", "test@gmail.com", "test");

        // Mock both checks as they're called in the service
        when(userRepo.existsByUsername(dto.username())).thenReturn(false);
        when(userRepo.existsByGmail(dto.gmail())).thenReturn(false);

        // Capture the user object that gets saved
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        doNothing().when(userRepo).save(captor.capture());

        userService.createAccountForUser(dto);

        // Verify save was called
        verify(userRepo, times(1)).save(any(User.class));

        User savedUser = captor.getValue();

        assertEquals("test", savedUser.getUsername());
        assertEquals("test@gmail.com", savedUser.getGmail());

        // Password should be encoded, so it should NOT equal plain text
        assertNotEquals("test", savedUser.getPassword());

        // Optionally verify password format (BCrypt starts with $2a, $2b, or $2y)
        assertTrue(savedUser.getPassword().startsWith("$2"));
    }

}
