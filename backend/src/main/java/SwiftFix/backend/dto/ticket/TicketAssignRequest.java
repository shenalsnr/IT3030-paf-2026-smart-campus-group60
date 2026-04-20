package SwiftFix.backend.dto.ticket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Body for PUT /api/tickets/{id}/assign — typically a technician user id or staff code. */
public class TicketAssignRequest {

    @NotBlank(message = "technicianId is required")
    @Size(max = 64)
    private String technicianId;

    public String getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(String technicianId) {
        this.technicianId = technicianId;
    }
}
