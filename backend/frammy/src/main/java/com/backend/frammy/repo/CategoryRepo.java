package com.backend.frammy.repo;

import com.backend.frammy.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {
    Category findByCategoryId(Long categoryId);

    boolean existsByCategoryName(String categoryName);

    void removeByCategoryId(Long categoryId);
}
