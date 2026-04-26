package SwiftFix.backend.exception;

/**
 * Used for domain rule violations (e.g. invalid status transition).
 * Mapped to HTTP 400 by {@link SwiftFix.backend.exception.GlobalExceptionHandler}.
 */
public class BusinessRuleException extends RuntimeException {

    public BusinessRuleException(String message) {
        super(message);
    }
}
