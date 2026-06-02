package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import ee.meeskond7.kultuuriranits_backend.service.ProgramService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/program/{programId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable Long programId){

        Program program = programService.getProgramById(programId);
        byte[] imageFile = program.getImageData();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(program.getImageType()))
                .body(imageFile);
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

    @GetMapping("/program/{id}")
    public Program getOneProgram(@PathVariable Long id){
        return programRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/program/{id}")
    public List<Program> deleteProgram(@PathVariable Long id){
        programRepository.deleteById(id);
        return programRepository.findAll();
    }

    //programmi lisamine
    @PostMapping("/program")
    public ResponseEntity<?> addProgram (@RequestPart Program program,
                                         @RequestPart MultipartFile imageFile){
        try {
            Program program1 = programService.addProgram(program, imageFile);
            return new ResponseEntity<>(program1, HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

}