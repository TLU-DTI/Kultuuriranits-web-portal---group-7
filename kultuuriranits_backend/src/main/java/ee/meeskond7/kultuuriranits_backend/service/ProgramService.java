package ee.meeskond7.kultuuriranits_backend.service;


import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    public Page<Program> searchPrograms(String keyword, Pageable pageable) {
        return programRepository.searchPrograms(keyword, pageable);
    }

}
