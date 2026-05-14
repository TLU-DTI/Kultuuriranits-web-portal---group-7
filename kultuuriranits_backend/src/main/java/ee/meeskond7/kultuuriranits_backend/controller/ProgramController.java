package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import ee.meeskond7.kultuuriranits_backend.service.ProgramService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@AllArgsConstructor
@RestController
public class ProgramController {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ProgramService programService;

    @GetMapping("program")
    public List<Program> getProgram(){
        return programRepository.findAll();
    }

    @GetMapping("program/{id}")
    public Program getOneProgram(@PathVariable Long id){
        return programRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("program/{id}")
    public List<Program> deleteProgram(@PathVariable Long id){
        programRepository.deleteById(id); //kustutab
        return programRepository.findAll(); //siin on uuenenud seis
    }

    @PostMapping("program")
    public List<Program> addProgram(@RequestBody Program program){
        if (program.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        programRepository.save(program); //siin salvestab
        return programRepository.findAll(); //siin on uuenenud seis
    }

    @PutMapping("program")
    public List<Program> editProgram(@RequestBody Program program){
        if (program.getId() == null){
            throw new RuntimeException("Cannot edit without ID");
        }
        if (!programRepository.existsById(program.getId())){
            throw new RuntimeException("Booking ID doesn't exist");
        }
        programRepository.save(program); //siin salvestab
        return programRepository.findAll(); //siin on uuenenud seis
    }

    //search bar programmide jaoks
    //ProgramController ->> ProgramService ->> ProgramRepository ->> Frontend
    @GetMapping("program/search")
    public ResponseEntity<List<Program>> searchPrograms(@RequestParam String keyword){
        List<Program> programs = programService.searchPrograms(keyword);
        return new ResponseEntity<>(programs, HttpStatus.OK);
    }
}