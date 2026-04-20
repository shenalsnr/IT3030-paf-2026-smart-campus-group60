package SwiftFix.backend.service;

import SwiftFix.backend.dto.ticket.*;
import SwiftFix.backend.enums.TicketStatus;
import SwiftFix.backend.exception.BusinessRuleException;
import SwiftFix.backend.exception.ResourceNotFoundException;
import SwiftFix.backend.model.Ticket;
import SwiftFix.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    /**
     * Creates a new ticket in OPEN state. Priority defaults to MEDIUM when omitted.
     */
    @Transactional
    public TicketResponse create(TicketCreateRequest request) {
        Ticket t = new Ticket();
        t.setStatus(TicketStatus.OPEN);
        t.setSubject(request.getSubject().trim());
        t.setDescription(request.getMessage().trim());
        t.setCategory(trimOrNull(request.getCategory()));
        t.setPriority(normalizePriority(request.getPriority()));
        t.setReporterName(request.getName().trim());
        t.setReporterEmail(request.getEmail().trim().toLowerCase());
        t.setRegNo(request.getRegNo().trim());
        t.setContactNo(request.getContactNo().trim());
        t.setFaculty(request.getFaculty().trim());
        t.setDepartment(request.getDepartment().trim());
        t.setCampus(request.getCampus().trim());
        t.setUserId(request.getUserId().trim());
        t.setResourceId(request.getResourceId());
        t.setLocation(trimOrNull(request.getLocation()));
        Ticket saved = ticketRepository.save(t);
        return TicketResponse.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> findAll() {
        return ticketRepository.findAll().stream()
                .map(TicketResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public TicketResponse findById(Long id) {
        return TicketResponse.fromEntity(getTicketOrThrow(id));
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> findByUserId(String userId) {
        if (userId == null || userId.isBlank()) {
            throw new BusinessRuleException("userId is required");
        }
        return ticketRepository.findByUserIdOrderByCreatedAtDesc(userId.trim()).stream()
                .map(TicketResponse::fromEntity)
                .toList();
    }

    /**
     * Updates workflow status with transition rules. REJECTED requires {@code rejectionReason}.
     */
    @Transactional
    public TicketResponse updateStatus(Long id, TicketStatusUpdateRequest body) {
        Ticket ticket = getTicketOrThrow(id);
        TicketStatus current = ticket.getStatus();
        TicketStatus next = body.getStatus();

        if (next == TicketStatus.REJECTED) {
            if (body.getRejectionReason() == null || body.getRejectionReason().isBlank()) {
                throw new BusinessRuleException("rejectionReason is required when status is REJECTED");
            }
            if (current != TicketStatus.OPEN && current != TicketStatus.IN_PROGRESS) {
                throw new BusinessRuleException("Tickets can only be rejected from OPEN or IN_PROGRESS");
            }
            ticket.setStatus(TicketStatus.REJECTED);
            ticket.setRejectionReason(body.getRejectionReason().trim());
            return TicketResponse.fromEntity(ticketRepository.save(ticket));
        }

        assertTransition(current, next);
        ticket.setStatus(next);
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    /**
     * Assigns a technician while the ticket is still active (not CLOSED / REJECTED).
     */
    @Transactional
    public TicketResponse assignTechnician(Long id, TicketAssignRequest body) {
        Ticket ticket = getTicketOrThrow(id);
        if (ticket.getStatus() == TicketStatus.CLOSED || ticket.getStatus() == TicketStatus.REJECTED) {
            throw new BusinessRuleException("Cannot assign technician to a closed or rejected ticket");
        }
        ticket.setTechnicianId(body.getTechnicianId().trim());
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    /**
     * PATCH semantics: technician adds resolution notes (typically near RESOLVED).
     */
    @Transactional
    public TicketResponse addResolutionNotes(Long id, TicketResolutionPatchRequest body) {
        Ticket ticket = getTicketOrThrow(id);
        if (ticket.getStatus() == TicketStatus.CLOSED || ticket.getStatus() == TicketStatus.REJECTED) {
            throw new BusinessRuleException("Cannot update resolution notes on a closed or rejected ticket");
        }
        ticket.setResolutionNotes(body.getResolutionNotes().trim());
        return TicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    @Transactional
    public void deleteById(Long id) {
        Ticket ticket = getTicketOrThrow(id);
        ticketRepository.delete(ticket);
    }

    private Ticket getTicketOrThrow(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    private void assertTransition(TicketStatus current, TicketStatus next) {
        boolean ok = switch (current) {
            case OPEN -> next == TicketStatus.IN_PROGRESS;
            case IN_PROGRESS -> next == TicketStatus.RESOLVED;
            case RESOLVED -> next == TicketStatus.CLOSED;
            case CLOSED, REJECTED -> false;
        };
        if (!ok) {
            throw new BusinessRuleException(
                    "Invalid status transition from " + current + " to " + next
            );
        }
    }

    private static String normalizePriority(String raw) {
        if (raw == null || raw.isBlank()) {
            return "MEDIUM";
        }
        String p = raw.trim().toUpperCase();
        if (!p.equals("LOW") && !p.equals("MEDIUM") && !p.equals("HIGH")) {
            throw new BusinessRuleException("priority must be LOW, MEDIUM, or HIGH");
        }
        return p;
    }

    private static String trimOrNull(String s) {
        if (s == null) {
            return null;
        }
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
