package SwiftFix.backend.service;

import SwiftFix.backend.model.Notification;
import SwiftFix.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Create and save a new notification for a user.
     *
     * @param userId  The ID of the user to notify.
     * @param message The notification message.
     * @param type    The notification type (e.g. BOOKING_APPROVED, BOOKING_REJECTED, SYSTEM_ALERT).
     * @return The saved Notification entity.
     */
    public Notification createNotification(String userId, String message, String type) {
        Notification notification = new Notification(userId, message, type);
        return notificationRepository.save(notification);
    }

    /**
     * Create a notification from a Notification request object (for POST endpoint).
     */
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Get all notifications for a specific user, ordered newest first.
     */
    public List<Notification> getNotificationsForUser(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Mark a notification as read.
     */
    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    /**
     * Delete a notification by ID.
     */
    public void deleteNotification(Long notificationId) {
        if (!notificationRepository.existsById(notificationId)) {
            throw new RuntimeException("Notification not found with id: " + notificationId);
        }
        notificationRepository.deleteById(notificationId);
    }

    /**
     * Get the count of unread notifications for a user.
     */
    public long getUnreadCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
}
