package ee.meeskond7.kultuuriranits_backend.repository;

import ee.meeskond7.kultuuriranits_backend.entity.Person;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<@NonNull Person,@NonNull Long> {
    //SELECT * FROM person WHERE email =
    Person findByEmail(String email);
}
