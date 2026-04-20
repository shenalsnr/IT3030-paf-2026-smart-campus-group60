package SwiftFix.backend.dto.ticket;

import SwiftFix.backend.model.Ticket;

import java.time.LocalDateTime;

/**
 * Stable API shape returned to the React client (decouples entity from wire format).
 */
public class TicketResponse {

    private Long id;
    private String status;
    private String subject;
    private String description;
    private String category;
    private String priority;
    private String reporterName;
    private String reporterEmail;
    private String regNo;
    private String contactNo;
    private String faculty;
    private String department;
    private String campus;
    private String userId;
    private String technicianId;
    private Long resourceId;
    private String location;
    private String resolutionNotes;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TicketResponse fromEntity(Ticket t) {
        TicketResponse r = new TicketResponse();
        r.setId(t.getId());
        r.setStatus(t.getStatus() != null ? t.getStatus().name() : null);
        r.setSubject(t.getSubject());
        r.setDescription(t.getDescription());
        r.setCategory(t.getCategory());
        r.setPriority(t.getPriority());
        r.setReporterName(t.getReporterName());
        r.setReporterEmail(t.getReporterEmail());
        r.setRegNo(t.getRegNo());
        r.setContactNo(t.getContactNo());
        r.setFaculty(t.getFaculty());
        r.setDepartment(t.getDepartment());
        r.setCampus(t.getCampus());
        r.setUserId(t.getUserId());
        r.setTechnicianId(t.getTechnicianId());
        r.setResourceId(t.getResourceId());
        r.setLocation(t.getLocation());
        r.setResolutionNotes(t.getResolutionNotes());
        r.setRejectionReason(t.getRejectionReason());
        r.setCreatedAt(t.getCreatedAt());
        r.setUpdatedAt(t.getUpdatedAt());
        return r;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getReporterEmail() {
        return reporterEmail;
    }

    public void setReporterEmail(String reporterEmail) {
        this.reporterEmail = reporterEmail;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(String technicianId) {
        this.technicianId = technicianId;
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

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
