package com.backend.frammy.controller;


import com.backend.frammy.dto.AddCategoryRequest;
import com.backend.frammy.dto.ApiResponse;
import com.backend.frammy.dto.CategoryAPIResponseDTO;
import com.backend.frammy.model.Category;
import com.backend.frammy.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;


    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryAPIResponseDTO>>> getAllCategory(){
        List<CategoryAPIResponseDTO> list = categoryService.getCategories();
          return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> addCategory(@RequestBody AddCategoryRequest addCategoryRequest){
             categoryService.createCategory(addCategoryRequest);
        return ResponseEntity.ok(ApiResponse.success("Category add success"));
    }

}
