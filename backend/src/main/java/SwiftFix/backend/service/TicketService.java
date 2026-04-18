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

    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus("OPEN");
        return repo.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return repo.findAll();
    }

    public Ticket updateStatus(Long id, String status) {
        Ticket t = repo.findById(id).orElseThrow();
        t.setStatus(status);
        return repo.save(t);
    }
}