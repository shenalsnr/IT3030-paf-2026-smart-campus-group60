package SwiftFix.backend.dto.ticket;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Payload for creating an incident ticket.
 * {@code message} is the user-facing description field from the React form;
 * it is persisted as {@code Ticket.description}.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketCreateRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 120)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 160)
    private String email;

    @NotBlank(message = "Registration number is required")
    @Size(max = 64)
    private String regNo;

    @NotBlank(message = "Contact number is required")
    @Size(max = 32)
    private String contactNo;

    @NotBlank(message = "Faculty is required")
    @Size(max = 120)
    private String faculty;

    @NotBlank(message = "Category is required")
    @Size(max = 64)
    private String category;

    @NotBlank(message = "Department is required")
    @Size(max = 120)
    private String department;

    @NotBlank(message = "Subject is required")
    @Size(max = 200)
    private String subject;

    @NotBlank(message = "Campus is required")
    @Size(max = 120)
    private String campus;

    /** Maps to entity {@code description} (form field name is "message"). */
    @NotBlank(message = "Description is required")
    @Size(max = 4000)
    private String message;

    /** Optional: LOW, MEDIUM, HIGH — defaults to MEDIUM in service if blank. */
    @Size(max = 16)
    private String priority;

    @NotBlank(message = "User id is required")
    @Size(max = 64)
    private String userId;

    /** Optional link to a catalogue resource (facility / equipment). */
    private Long resourceId;

    /** Free-text location when not using resourceId. */
    @Size(max = 200)
    private String location;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
