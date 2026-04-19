package SwiftFix.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String subject;

    private String category;
    private String priority;
    private String status;

    private String userId;
    private String technicianId;

    // 🔥 NEW FIELDS
    private String regNo;
    private String contactNo;
    private String faculty;
    private String department;
    private String campus;

    private LocalDateTime createdAt;

    // 🔥 AUTO SET DATE BEFORE INSERT
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "OPEN";
        }
    }

    // ================= GETTERS =================

    public Long getId() { return id; }

    public String getDescription() { return description; }

    public String getSubject() { return subject; }

    public String getCategory() { return category; }

    public String getPriority() { return priority; }

    public String getStatus() { return status; }

    public String getUserId() { return userId; }

    public String getTechnicianId() { return technicianId; }

    public String getRegNo() { return regNo; }

    public String getContactNo() { return contactNo; }

    public String getFaculty() { return faculty; }

    public String getDepartment() { return department; }

    public String getCampus() { return campus; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    // ================= SETTERS =================

    public void setId(Long id) { this.id = id; }

    public void setDescription(String description) { this.description = description; }

    public void setSubject(String subject) { this.subject = subject; }

    public void setCategory(String category) { this.category = category; }

    public void setPriority(String priority) { this.priority = priority; }

    public void setStatus(String status) { this.status = status; }

    public void setUserId(String userId) { this.userId = userId; }

    public void setTechnicianId(String technicianId) { this.technicianId = technicianId; }

    public void setRegNo(String regNo) { this.regNo = regNo; }

    public void setContactNo(String contactNo) { this.contactNo = contactNo; }

    public void setFaculty(String faculty) { this.faculty = faculty; }

    public void setDepartment(String department) { this.department = department; }

    public void setCampus(String campus) { this.campus = campus; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}