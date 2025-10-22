package com.backend.frammy.service;

import com.backend.frammy.dto.AddCategoryRequest;
import com.backend.frammy.dto.CategoryAPIResponseDTO;
import com.backend.frammy.exception.ObjectAlreadyExist;
import com.backend.frammy.mapper.CategoryToDTO;
import com.backend.frammy.model.Category;
import com.backend.frammy.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;
    private final CategoryToDTO categoryToDTO;

    @Transactional
    public void createCategory(AddCategoryRequest addCategoryRequest) {
        boolean categoryExist = categoryRepo.existsByCategoryName(addCategoryRequest.categoryName());
        if (categoryExist){
            throw new ObjectAlreadyExist("This category already exist");
        }
        Category category = new Category();
        category.setCategoryName(addCategoryRequest.categoryName());
        categoryRepo.save(category);
    }

    public List<CategoryAPIResponseDTO> getCategories() {
        return categoryRepo.findAll()
                .stream().map(categoryToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeCategory(Long categoryId) {
        categoryRepo.removeByCategoryId(categoryId);

    }

    public void updateCategory(AddCategoryRequest addCategoryRequest, Long categoryId) {

        boolean exist = categoryRepo.existsByCategoryName(addCategoryRequest.categoryName());

        if (exist){
            throw new ObjectAlreadyExist("This category already exist");
        }
        Category category =categoryRepo.findByCategoryId(categoryId);
        category.setCategoryName(addCategoryRequest.categoryName());
        categoryRepo.save(category);

    }
}
