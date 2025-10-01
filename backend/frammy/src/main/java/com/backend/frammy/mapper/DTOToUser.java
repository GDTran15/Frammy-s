package com.backend.frammy.mapper;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.dto.RegisterRequestDTO;
import com.backend.frammy.model.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class DTOToUser implements Function<RegisterRequestDTO, User> {

    @Override
    public User apply(RegisterRequestDTO registerRequestDTO) {
        return User.builder()
                .username(registerRequestDTO.username())
                .gmail(registerRequestDTO.gmail())
                .password(registerRequestDTO.password())
                .build();
    }
}
