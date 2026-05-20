package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.dto.PersonLoginRecordDto;
import ee.meeskond7.kultuuriranits_backend.entity.Person;
import ee.meeskond7.kultuuriranits_backend.repository.PersonRepository;
import ee.meeskond7.kultuuriranits_backend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    //Dependency injection.
    @Autowired
    private PersonService personService;

    @GetMapping("person")
    public List<Person> getPerson(){
        return personRepository.findAll();
    }

    @DeleteMapping("person/{id}")
    public List<Person> deletePerson(@PathVariable Long id){
        personRepository.deleteById(id); //kustutab
        return personRepository.findAll(); //siin on uuenenud seis
    }


    //Registreerimine
    @PostMapping("signup")
    public Person signup(@RequestBody Person person){
        if (person.getId()!=null){
            throw new RuntimeException("Cannot signup with ID");
        }
        personService.validate(person);
        return personRepository.save(person);
    }

    @PutMapping("profile")
    public Person updateProfile(@RequestBody Person person){
        if (person.getId()==null){
            throw new RuntimeException("Invalid ID");
        }
        personService.validate(person);
        return personRepository.save(person);
    }

    @GetMapping("profile")
    public Person getProfile(@RequestParam Long id){
        return personRepository.findById(id).orElseThrow();
    }


    //Sisselogimine
    @PostMapping("login")
    public Person login(@RequestBody PersonLoginRecordDto personDto){
        Person dbPerson = personRepository.findByEmail(personDto.email());
        if (dbPerson == null) {
            throw new RuntimeException("Invalid email");
        }
        if (!dbPerson.getPassword().equals(personDto.password())) {
            throw new RuntimeException("Invalid password");
        }
        return dbPerson;
    }
}

