package com.backend.frammy.service;

import  com.backend.frammy.model.User;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.exception.UserAlreadyExistException;
import com.backend.frammy.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);


    public void createAccountForUser(RegisterRequestDTO registerRequestDTO) {
            boolean userExist = userRepo.existsByUsername(registerRequestDTO.username());
            boolean gmailExist = userRepo.existsByGmail(registerRequestDTO.gmail());
            if (userExist || gmailExist){
                throw new UserAlreadyExistException("Username or gmail already exist");
            }
            User user = User.builder()
                    .username(registerRequestDTO.username())
                    .password(bCryptPasswordEncoder.encode(registerRequestDTO.password()))
                    .gmail(registerRequestDTO.gmail())
                    .build();
            userRepo.save(user);
    }
}
