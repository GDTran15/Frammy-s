package com.backend.frammy.service;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.mapper.DtoToUser;
import com.backend.frammy.model.User;
import com.backend.frammy.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final DtoToUser dtoToUser;
    private final UserRepository userRepo;

    public void createUser(@Valid CreateUserRequestDTO createUserRequestDTO) {
        User newUser = dtoToUser.apply(createUserRequestDTO);
        userRepo.save(newUser);
    }
}
