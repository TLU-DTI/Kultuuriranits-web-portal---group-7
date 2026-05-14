package ee.meeskond7.kultuuriranits_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal pricePerStudent;

    private Integer durationMinutes;

    private String targetGroup;

    private Integer minGroupSize;

    private Integer maxGroupSize;

    private String location;

    private String language;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Integer organizationId;
}