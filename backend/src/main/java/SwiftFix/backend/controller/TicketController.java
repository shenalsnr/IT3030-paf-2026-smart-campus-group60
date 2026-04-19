package SwiftFix.backend.controller;

import SwiftFix.backend.model.Ticket;
import SwiftFix.backend.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    // 🔷 CREATE TICKET
    @PostMapping
    public Ticket create(@RequestBody Ticket ticket) {
        return service.createTicket(ticket);
    }

    // 🔷 GET ALL TICKETS
    @GetMapping
    public List<Ticket> getAll() {
        return service.getAllTickets();
    }

    // 🔷 UPDATE STATUS
    @PutMapping("/{id}")
    public Ticket updateStatus(@PathVariable Long id, @RequestBody Ticket t) {
        return service.updateStatus(id, t.getStatus());
    }

    // 🔷 ASSIGN TECHNICIAN
    @PutMapping("/{id}/assign")
    public Ticket assignTechnician(@PathVariable Long id, @RequestBody Ticket t) {
        return service.assignTechnician(id, t.getTechnicianId());
    }

    // 🔷 DELETE TICKET (optional)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTicket(id);
    }
}