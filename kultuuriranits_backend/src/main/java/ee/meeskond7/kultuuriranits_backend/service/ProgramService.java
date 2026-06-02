package ee.meeskond7.kultuuriranits_backend.service;

import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    public Page<Program> searchPrograms(String keyword, Long categoryId, Pageable pageable) {
        // Kui kasutaja valis otsingule lisaks ka kategooria
        if (categoryId != null) {
            return programRepository.searchProgramsWithCategory(keyword, categoryId, pageable);
        }

        // Kui otsitakse ainult märksõna järgi ilma kategooriata
        return programRepository.searchPrograms(keyword, pageable);
    }

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
}