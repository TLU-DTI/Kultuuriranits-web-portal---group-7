package ee.meeskond7.kultuuriranits_backend.repository;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<@NonNull Program,@NonNull Long> {

    //Searchbar otsib andmebaasist sarnasusi Program.title ja Program.descriptioni vahel ning pakub tulemusi. Siia voib hiljem juurde lisada variante.
    @Query("SELECT p FROM Program p WHERE " +
            "LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))"
    )
    Page<Program> searchPrograms(String keyword, Pageable pageable);

}

