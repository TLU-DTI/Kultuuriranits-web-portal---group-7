package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import ee.meeskond7.kultuuriranits_backend.service.ProgramService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    // http://localhost:5050/program?categoryId=3 <-- Filtreerib kategooria järgi
    @GetMapping("/program")
    public Page<Program> getProgram(
            @RequestParam(required = false) Long categoryId,
            Pageable pageable) {

        if (categoryId != null) {
            return programRepository.findByCategoryId(categoryId, pageable);
        }

        return programRepository.findAll(pageable);
    }

    @GetMapping("/program/{id}")
    public Program getOneProgram(@PathVariable Long id){
        return programRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/program/{id}")
    public List<Program> deleteProgram(@PathVariable Long id){
        programRepository.deleteById(id);
        return programRepository.findAll();
    }

    @PostMapping("/program")
    public List<Program> addProgram(@RequestBody Program program){
        if (program.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        programRepository.save(program);
        return programRepository.findAll();
    }

    @PutMapping("/program")
    public List<Program> editProgram(@RequestBody Program program){
        if (program.getId() == null){
            throw new RuntimeException("Cannot edit without ID");
        }
        if (!programRepository.existsById(program.getId())){
            throw new RuntimeException("Booking ID doesn't exist");
        }
        programRepository.save(program);
        return programRepository.findAll();
    }

    // search bar programmide jaoks koos valikulise kategooriaga
    // http://localhost:5050/program/search?keyword=teater&categoryId=3
    @GetMapping("/program/search")
    public ResponseEntity<Page<Program>> searchPrograms(
            @RequestParam String keyword,
            @RequestParam(required = false) Long categoryId,
            Pageable pageable){

        System.out.println("searching with keyword: " + keyword + " and categoryId: " + categoryId);

        Page<Program> programs = programService.searchPrograms(keyword, categoryId, pageable);
        return new ResponseEntity<>(programs, HttpStatus.OK);
    }
}