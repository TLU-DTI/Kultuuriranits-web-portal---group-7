package ee.meeskond7.kultuuriranits_backend.service;


import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    public List<Program> searchPrograms(String keyword) {
        return programRepository.searchPrograms(keyword);
    }

}
