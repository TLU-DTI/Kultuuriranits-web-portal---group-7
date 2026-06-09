package ee.meeskond7.kultuuriranits_backend.repository;

import ee.meeskond7.kultuuriranits_backend.entity.Favorites;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<@NonNull Favorites,@NonNull Long> {
    boolean existsByProgramIdAndPersonId(Long programId, Long personId);

    List<Favorites> findByPersonId(Long userId);
}