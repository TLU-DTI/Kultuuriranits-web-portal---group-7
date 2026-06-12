package ee.meeskond7.kultuuriranits_backend.service;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    // Programmide otsing
    public Page<Program> searchPrograms(String keyword, Long categoryId, Pageable pageable) {
        if (categoryId != null) {
            return programRepository.searchProgramsWithCategory(keyword, categoryId, pageable);
        }
        return programRepository.searchPrograms(keyword, pageable);
    }



    public Page<Program> searchProgramsAll(String keyword, Long categoryId, String location, String language, BigDecimal pricePerStudent, Integer durationMinutes, String targetGroup, Integer minGroupSize, Integer maxGroupSize, String status, Pageable pageable) {
        
        return programRepository.searchProgramsAll((keyword==null)?null:"%"+keyword.toLowerCase()+"%", categoryId, location, language, pricePerStudent, durationMinutes, targetGroup, minGroupSize,maxGroupSize, status, pageable);
    }


    // Programmide lisamine
    public Program addProgram(Program program, MultipartFile imageFile) throws IOException {
        program.setCreatedAt(LocalDateTime.now());
        program.setUpdatedAt(LocalDateTime.now());

        program.setImageName(imageFile.getOriginalFilename());
        program.setImageType(imageFile.getContentType());
        program.setImageData(imageFile.getBytes());

        return programRepository.save(program);
    }
    public Program getProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Programmi ei leitud ID-ga: " + id));
    }


    public Program updateProgram(Long id, Program incomingProgram, MultipartFile imageFile) throws IOException {
        Program existingProgram = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Programmi ei leitud ID-ga: " + id));
        existingProgram.setUpdatedAt(LocalDateTime.now());

        // programmi atribuudid
        existingProgram.setTitle(incomingProgram.getTitle());
        existingProgram.setDescription(incomingProgram.getDescription());
        existingProgram.setPricePerStudent(incomingProgram.getPricePerStudent());
        existingProgram.setDurationMinutes(incomingProgram.getDurationMinutes());
        existingProgram.setTargetGroup(incomingProgram.getTargetGroup());
        existingProgram.setMinGroupSize(incomingProgram.getMinGroupSize());
        existingProgram.setMaxGroupSize(incomingProgram.getMaxGroupSize());
        existingProgram.setLocation(incomingProgram.getLocation());
        existingProgram.setLanguage(incomingProgram.getLanguage());
        existingProgram.setStatus(incomingProgram.getStatus());

        if (incomingProgram.getCategory() != null) {
            existingProgram.setCategory(incomingProgram.getCategory());
        }

        if (incomingProgram.getOrganization() != null) {
            existingProgram.setOrganization(incomingProgram.getOrganization());
        }

        // 5. Pildifaili uuendamise kontroll
        if (imageFile != null && !imageFile.isEmpty()) {
            existingProgram.setImageName(imageFile.getOriginalFilename());
            existingProgram.setImageType(imageFile.getContentType());
            existingProgram.setImageData(imageFile.getBytes());
        }
        return programRepository.save(existingProgram);
    }
}