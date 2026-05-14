package ee.meeskond7.kultuuriranits_backend.controller;

import ee.meeskond7.kultuuriranits_backend.entity.Booking;
import ee.meeskond7.kultuuriranits_backend.repository.BookingRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@AllArgsConstructor
@RestController
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("booking")
    public List<Booking> getBooking(){
        return bookingRepository.findAll();
    }

    //@GetMapping("booking/admin")
    //public List<Booking> getAdminBookings(){
    //    return bookingRepository.findAll(); <--- admini jaoks vbl kunagi?
    // }

    @GetMapping("booking/{id}")
    public Booking getOneBooking(@PathVariable Long id){
        return bookingRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("booking/{id}")
    public List<Booking> deleteBooking(@PathVariable Long id){
        bookingRepository.deleteById(id); //kustutab
        return bookingRepository.findAll(); //siin on uuenenud seis
    }

    @PostMapping("booking")
    public List<Booking> addBooking(@RequestBody Booking booking){
        if (booking.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        bookingRepository.save(booking); //siin salvestab
        return bookingRepository.findAll(); //siin on uuenenud seis
    }

    @PutMapping("booking")
    public List<Booking> editBooking(@RequestBody Booking booking){
        if (booking.getId() == null){
            throw new RuntimeException("Cannot edit without ID");
        }
        if (!bookingRepository.existsById(booking.getId())){
            throw new RuntimeException("Booking ID doesn't exist");
        }
        bookingRepository.save(booking); //siin salvestab
        return bookingRepository.findAll(); //siin on uuenenud seis
    }
}
