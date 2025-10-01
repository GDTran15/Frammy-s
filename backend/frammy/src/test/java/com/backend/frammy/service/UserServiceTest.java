package com.backend.frammy.service;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.dto.UserResponseDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.DTOToUser;
import com.backend.frammy.mapper.UserToDTO;
import com.backend.frammy.model.User;

import com.backend.frammy.repo.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

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
        User user = new User();

        when(userRepo.existsByUsername(dto.username())).thenReturn(false);
        when(userRepo.existsByGmail(dto.gmail())).thenReturn(false);
        when(dtoToUser.apply(dto)).thenReturn(user);

        userService.createAccountForUser(dto);

        verify(userRepo, times(1)).save(user);
    }

}
