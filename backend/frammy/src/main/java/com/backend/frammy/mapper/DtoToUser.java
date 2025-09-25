package com.backend.frammy.mapper;

import com.backend.frammy.dto.CreateUserRequestDTO;
import com.backend.frammy.model.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class DtoToUser implements Function<CreateUserRequestDTO, User> {


    @Override
    public User apply(CreateUserRequestDTO createUserRequestDTO) {
        return User.builder()
                .gmail(createUserRequestDTO.gmail())
                .password(createUserRequestDTO.password())
                .role(createUserRequestDTO.role())
                .username(createUserRequestDTO.username())
                .build();
    }
}
