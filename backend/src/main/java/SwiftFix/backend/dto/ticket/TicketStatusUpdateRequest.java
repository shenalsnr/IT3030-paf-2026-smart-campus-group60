package SwiftFix.backend.dto.ticket;

import SwiftFix.backend.enums.TicketStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Body for PUT /api/tickets/{id} — change workflow status.
 * When moving to {@link TicketStatus#REJECTED}, {@code rejectionReason} is required (enforced in service).
 */
public class TicketStatusUpdateRequest {

    @NotNull(message = "status is required")
    private TicketStatus status;

    @Size(max = 1000)
    private String rejectionReason;

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
