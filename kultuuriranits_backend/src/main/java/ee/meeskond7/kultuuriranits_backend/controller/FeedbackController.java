package ee.meeskond7.kultuuriranits_backend.controller;


import ee.meeskond7.kultuuriranits_backend.entity.Feedback;
import ee.meeskond7.kultuuriranits_backend.entity.Program;
import ee.meeskond7.kultuuriranits_backend.repository.FeedbackRepository;
import ee.meeskond7.kultuuriranits_backend.repository.ProgramRepository;
import ee.meeskond7.kultuuriranits_backend.service.FeedbackService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@AllArgsConstructor
@RestController
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    private final ProgramRepository programRepository;

    private final FeedbackService feedbackService;

    @GetMapping("feedback")
    public List<Feedback> getFeedback(HttpSession session){
        Long userId = (Long) session.getAttribute("user_id");
        for (Program program : programRepository.findAll()) {
            try {
                feedbackService.updateProgramAverageRating(program.getId());
            } catch (Exception e) {
                System.out.println("Could not update program ID: " + program.getId() + " - " + e.getMessage());
            }
        }
        return feedbackRepository.findAll();
    }

    @PostMapping("feedback")
    public List<Feedback> addFeedback(@RequestBody Feedback feedback, HttpSession session) {
        if (feedback.getId() != null) {
            throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Cannot add with ID"
            );
        }
        if (feedback.getPerson() == null || feedback.getPerson().getId() == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User id missing!"
            );
        }
        feedback.setCreatedAt(java.time.LocalDateTime.now());
        boolean alreadyAdded = feedbackRepository.existsByProgramIdAndPersonId(
                feedback.getProgram().getId(),
                feedback.getPerson().getId()
        );

        if (alreadyAdded) {
            throw new org.springframework.web.server.ResponseStatusException(
                    HttpStatus.CONFLICT, "You have already added feedback for this program!"
            );
        }

        feedbackRepository.save(feedback);
        return feedbackRepository.findAll();
    }

    @DeleteMapping("feedback/{id}")
    public List<Feedback> deleteFeedback(@PathVariable Long id){
        feedbackRepository.deleteById(id);
        return feedbackRepository.findAll();
    }
}
