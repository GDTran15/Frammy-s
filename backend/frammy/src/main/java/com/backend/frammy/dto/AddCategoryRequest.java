package com.backend.frammy.dto;

import jakarta.validation.constraints.NotBlank;

public record AddCategoryRequest(
        @NotBlank(message = "Category name is require")
        String categoryName
) {
}
