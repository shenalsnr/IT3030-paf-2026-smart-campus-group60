# Smart Campus Operations Hub (SwiftFix)

A full-stack web application built for the **IT3030 – Programming Applications and Frameworks** group assignment.  
This system helps a university manage **facility and asset bookings** and **maintenance / incident ticketing** through a single web platform with structured workflows, role-based access, and a modern UI.

---

## Project Overview

Smart Campus Operations Hub is designed to support day-to-day university operations in a more organized and efficient way.

The system focuses on two main operational areas:

- **Booking Management** for lecture halls, labs, meeting rooms, and equipment
- **Maintenance & Incident Ticketing** for reporting issues, assigning technicians, tracking resolution progress, and managing comments

The application follows a **Spring Boot REST API + React client** architecture and uses a persistent database for data storage.

---

## Key Features

### 1.Module A - Facilities & Assets Catalogue
Module A 
Overview
This module is responsible for managing all bookable resources within the Smart Campus system, including lecture halls, laboratories, meeting rooms, and equipment. It provides structured access to resource information and supports efficient discovery and management.

Features
Add, update, delete, and view resources (CRUD operations)
Maintain detailed resource metadata:
   Resource name
   Type (Lecture Hall, Lab, Equipment, etc.)
   Capacity
   Location
   Availability time windows
   Status (ACTIVE / OUT_OF_SERVICE)
   
Advanced search and filtering:
Filter by type, capacity, and location
Keyword-based search
Resource availability visibility:
Prevent selection of unavailable or inactive resources

Business Logic
Only resources with ACTIVE status can be booked
Resources marked as OUT_OF_SERVICE are automatically excluded from booking
Capacity validation ensures suitable allocation based on user requirements
Availability windows restrict bookings to valid time ranges

Role-Based Access
Admin
Full control (create, update, delete resources)
User
View and search resources only

### 2. Booking Management
- Create booking requests for resources
- Booking workflow: **PENDING → CONFIRMED / REJECTED**
- Prevent booking conflicts for the same resource and time slot
- Allow admins to approve or reject bookings with a reason
- Allow users to view their own bookings
- Allow admins to view and manage all bookings

### 3. Maintenance & Incident Ticketing
- Create maintenance tickets for campus issues
- Add issue details such as title, description, priority, location, and contact information
- Upload image evidence for tickets
- Ticket workflow: **OPEN → IN_PROGRESS → RESOLVED → CLOSED**
- Support **REJECTED** tickets with reason
- Assign technicians to tickets
- Add resolution notes
- Add, update, and delete comments based on ownership rules

### 4. Authentication & Authorization
- Google OAuth 2.0 login support
- Role-based access control
- Separate access paths for normal users and admin users

### 5. User Experience
- Clean and responsive user interface
- Admin dashboards for management tasks
- Student-friendly views for bookings and tickets
- Better usability with validation and structured workflows

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons
- Vite

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Validation
- MySQL

### Tools
- Git & GitHub
- GitHub Actions
- Postman
- VS Code / IntelliJ IDEA

---

## System Modules

### Module A – Facilities Catalogue
Handles the creation and management of university resources.

### Module B – Booking Management
Handles booking requests, conflict checking, approval, rejection, and booking status flow.

### Module C – Maintenance Ticketing
Handles incident reporting, attachments, technician assignment, resolution notes, and comments.

### Module D – Notifications
Supports user updates related to booking decisions and ticket progress.

### Module E – Authentication & Authorization
Handles login, role management, protected routes, and secure access.

---

## Project Structure

```bash
SwiftFix/
├── backend/
│   ├── src/main/java/SwiftFix/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── enums/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── home/
│   │   │   └── ...
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
