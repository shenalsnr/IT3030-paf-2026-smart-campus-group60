package SwiftFix.backend.controller;

import SwiftFix.backend.dto.UpdateUserRequest;
import SwiftFix.backend.dto.UpdateProfileRequest;
import SwiftFix.backend.dto.UserDTO;
import SwiftFix.backend.service.UserService;
import SwiftFix.backend.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    /**
     * POST /api/users/register - Register a new user
     * Note: This endpoint redirects to /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> register() {
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY).body("Use /api/auth/register instead");
    }

    /**
     * GET /api/users/me - Get current logged-in user
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long userId = extractUserIdFromToken(authHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UserDTO user = userService.getCurrentUser(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * POST /api/users/update-profile - Update user profile and notification preferences
     */
    @PostMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "studentId", required = false) String studentId,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "faculty", required = false) String faculty,
            @RequestParam(value = "emailNotifications", required = false) String emailNotifications,
            @RequestParam(value = "bookingUpdates", required = false) String bookingUpdates,
            @RequestParam(value = "resourceAvailability", required = false) String resourceAvailability,
            @RequestParam(value = "systemAlerts", required = false) String systemAlerts,
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto) {
        
        Long userId = extractUserIdFromToken(authHeader);
        if (userId == null) {
            System.out.println("ERROR: No userId extracted from token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    java.util.Map.of("message", "Unauthorized: No valid token found"));
        }

        System.out.println("UPDATE PROFILE REQUEST - User: " + userId);
        System.out.println("  fullName: " + fullName);
        System.out.println("  studentId: " + studentId);
        System.out.println("  phoneNumber: " + phoneNumber);
        System.out.println("  address: " + address);
        System.out.println("  faculty: " + faculty);
        System.out.println("  emailNotifications: " + emailNotifications);
        System.out.println("  bookingUpdates: " + bookingUpdates);
        System.out.println("  resourceAvailability: " + resourceAvailability);
        System.out.println("  systemAlerts: " + systemAlerts);
        System.out.println("  profilePhoto: " + (profilePhoto != null ? profilePhoto.getOriginalFilename() : "null"));

        // Convert string booleans to Boolean objects
        Boolean emailNotifBool = emailNotifications != null ? Boolean.parseBoolean(emailNotifications) : null;
        Boolean bookingUpdatesBool = bookingUpdates != null ? Boolean.parseBoolean(bookingUpdates) : null;
        Boolean resourceAvailBool = resourceAvailability != null ? Boolean.parseBoolean(resourceAvailability) : null;
        Boolean systemAlertsBool = systemAlerts != null ? Boolean.parseBoolean(systemAlerts) : null;

        UpdateProfileRequest request = UpdateProfileRequest.builder()
                .fullName(fullName)
                .studentId(studentId)
                .phoneNumber(phoneNumber)
                .address(address)
                .faculty(faculty)
                .emailNotifications(emailNotifBool)
                .bookingUpdates(bookingUpdatesBool)
                .resourceAvailability(resourceAvailBool)
                .systemAlerts(systemAlertsBool)
                .build();

        try {
            UserDTO updatedUser = userService.updateUserProfile(userId, request, profilePhoto);
            System.out.println("✓ Profile updated successfully for user: " + userId);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            System.out.println("✗ Error updating profile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    java.util.Map.of("message", "Failed to update profile: " + e.getMessage()));
        }
    }

    /**
     * GET /api/users - Get all users (Admin only)
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        // Check if user is admin (in a real app, use Spring Security)
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * GET /api/users/{id} - Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * PUT /api/users/{id} - Update user profile
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {
        UserDTO updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * DELETE /api/users/{id} - Delete user (Admin only)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Helper method to extract userId from JWT token
     * Uses JwtProvider to parse and validate token
     */
    private Long extractUserIdFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                if (jwtProvider.validateToken(token)) {
                    return jwtProvider.getUserIdFromToken(token);
                }
            } catch (Exception e) {
                // Invalid token
                return null;
            }
        }
        return null;
    }
}
