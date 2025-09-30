package com.backend.frammy.service;

import com.backend.frammy.dto.AddCategoryRequest;
import com.backend.frammy.dto.CategoryAPIResponseDTO;
import com.backend.frammy.mapper.CategoryToDTO;
import com.backend.frammy.model.Category;
import com.backend.frammy.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;
    private final CategoryToDTO categoryToDTO;

    @Transactional
    public Category createCategory(AddCategoryRequest addCategoryRequest) {
        Category category = new Category();
        category.setCategoryName(addCategoryRequest.categoryName());
        return  categoryRepo.save(category);
    }

    public List<CategoryAPIResponseDTO> getCategories() {
        return categoryRepo.findAll()
                .stream().map(categoryToDTO)
                .collect(Collectors.toList());
    }
}
