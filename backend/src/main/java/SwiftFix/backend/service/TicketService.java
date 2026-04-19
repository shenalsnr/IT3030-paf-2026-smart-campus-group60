package SwiftFix.backend.service;

import SwiftFix.backend.model.Ticket;
import SwiftFix.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repo;

    public TicketService(TicketRepository repo) {
        this.repo = repo;
    }

    // 🔷 CREATE TICKET
    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus("OPEN"); // default status
        return repo.save(ticket);
    }

    // 🔷 GET ALL TICKETS
    public List<Ticket> getAllTickets() {
        return repo.findAll();
    }

    // 🔷 GET SINGLE TICKET (NEW - useful)
    public Ticket getTicketById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    }

    // 🔷 UPDATE STATUS WITH STRICT WORKFLOW
    public Ticket updateStatus(Long id, String newStatus) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        String currentStatus = ticket.getStatus();

        // ✅ Enforce proper workflow transitions
        if (!isValidTransition(currentStatus, newStatus)) {
            throw new RuntimeException("Invalid status transition from " 
                    + currentStatus + " to " + newStatus);
        }

        ticket.setStatus(newStatus);
        return repo.save(ticket);
    }

    // 🔷 ASSIGN TECHNICIAN
    public Ticket assignTechnician(Long id, String technicianId) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setTechnicianId(technicianId);
        return repo.save(ticket);
    }

    // 🔷 DELETE TICKET
    public void deleteTicket(Long id) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        repo.delete(ticket);
    }

    // 🔷 STATUS WORKFLOW VALIDATION (IMPORTANT)
    private boolean isValidTransition(String current, String next) {

        switch (current) {
            case "OPEN":
                return next.equals("IN_PROGRESS");

            case "IN_PROGRESS":
                return next.equals("RESOLVED");

            case "RESOLVED":
                return next.equals("CLOSED");

            case "CLOSED":
                return false;

            default:
                return false;
        }
    }
}