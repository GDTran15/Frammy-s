package com.backend.frammy.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @ManyToOne
    @JoinColumn(name = "nominee_id", nullable = false)
    private Nominee nominee;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
