package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Favorites;
import ee.meeskond7.kultuuriranits_backend.repository.FavoritesRepository;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@AllArgsConstructor
@RestController
public class FavoritesController {

    private final FavoritesRepository favoritesRepository;

    @GetMapping("favorites")
    public List<Favorites> getFavorites(HttpSession session){
        Long userId = (Long) session.getAttribute("user_id");
        if (userId == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Selle tegevuse jaoks pead olema sisselogitud!"
            );
        }
        return favoritesRepository.findByPersonId(userId);
    }

    @PostMapping("favorites")
    public List<Favorites> addFavorites(@RequestBody Favorites favorites){
        if (favorites.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        boolean alreadyAdded = favoritesRepository.existsByProgramIdAndPersonId(
                favorites.getProgram().getId(),
                favorites.getPerson().getId()
        );

        if (alreadyAdded) {throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.CONFLICT, "See programm on juba lemmikutes!");
        }
        favoritesRepository.save(favorites);
        return favoritesRepository.findAll();
    }

    @DeleteMapping("favorites/{id}")
    public List<Favorites> deleteFavorites(@PathVariable Long id){
        favoritesRepository.deleteById(id);
        return favoritesRepository.findAll();
    }
}
