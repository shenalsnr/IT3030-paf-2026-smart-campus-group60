package SwiftFix.backend.enums;

/**
 * Incident workflow aligned with Smart Campus spec:
 * OPEN → IN_PROGRESS → RESOLVED → CLOSED.
 * Admins may REJECT from OPEN or IN_PROGRESS with a stored reason.
 */
public enum TicketStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED,
    CLOSED,
    REJECTED
}
