package com.backend.frammy.service;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.mapper.DtoToUser;
import com.backend.frammy.model.User;
import com.backend.frammy.repo.UserRepo;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final DtoToUser dtoToUser;
    private final UserRepo userRepo;

    public void createUser(@Valid CreateUserRequestDTO createUserRequestDTO) {
        User newUser = dtoToUser.apply(createUserRequestDTO);
        userRepo.save(newUser);
    }
}
