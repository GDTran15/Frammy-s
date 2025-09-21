package com.backend.frammy.service;

import com.backend.frammy.model.Role;
import  com.backend.frammy.model.User;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.exception.UserAlreadyExistException;
import com.backend.frammy.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Transactional
    public void createAccountForUser(RegisterRequestDTO registerRequestDTO) {
            boolean userExist = userRepo.existsByUsername(registerRequestDTO.username());
            boolean gmailExist = userRepo.existsByGmail(registerRequestDTO.gmail());
            if (userExist || gmailExist){
                throw new UserAlreadyExistException("Username or gmail already exist");
            }
            User user = User.builder()
                    .username(registerRequestDTO.username())
                    .gmail(registerRequestDTO.gmail())
                    .password(bCryptPasswordEncoder.encode(registerRequestDTO.password()))
                    .role(Role.ROLE_USER)
                    .build();
            userRepo.save(user);
    }
}
