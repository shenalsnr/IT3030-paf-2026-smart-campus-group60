package SwiftFix.backend.controller;

import SwiftFix.backend.model.Booking;
import SwiftFix.backend.service.BookingService;
import SwiftFix.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getUserBookings(@RequestParam String userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        Booking approved = bookingService.approveBooking(id);
        notificationService.createNotification(
            approved.getUserId(),
            "Your booking request for resource '" + approved.getResourceId() +
            "' on " + approved.getDate() + " has been APPROVED.",
            "BOOKING_APPROVED"
        );
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Booking> rejectBooking(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String reason = body.getOrDefault("reason", "No reason provided");
        Booking rejected = bookingService.rejectBooking(id, reason);
        notificationService.createNotification(
            rejected.getUserId(),
            "Your booking request for resource '" + rejected.getResourceId() +
            "' on " + rejected.getDate() + " has been REJECTED. Reason: " + reason,
            "BOOKING_REJECTED"
        );
        return ResponseEntity.ok(rejected);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String reason = body.getOrDefault("reason", "No reason provided");
        return ResponseEntity.ok(bookingService.cancelBooking(id, reason));
    }
}
