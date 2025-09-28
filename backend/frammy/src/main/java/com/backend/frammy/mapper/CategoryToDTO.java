package com.backend.frammy.mapper;

import com.backend.frammy.dto.CategoryAPIResponseDTO;
import com.backend.frammy.model.Category;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class CategoryToDTO implements Function<Category, CategoryAPIResponseDTO> {
    @Override
    public CategoryAPIResponseDTO apply(Category category) {
        return new CategoryAPIResponseDTO(
                category.getCategoryId(),category.getCategoryName());
    }
}
