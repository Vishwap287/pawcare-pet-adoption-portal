# 🐾 PawCare – Pet Adoption Portal

A complete full-stack pet adoption platform built with the MySQL-backed MERN-style stack (MySQL, Express, React, Node.js). PawCare lets visitors browse adoptable pets, apply for adoption, and track their applications, while admins manage pets, users, applications and contact messages from a dedicated admin panel.

This project was built as a complete, working internship/portfolio-grade application — every button, form and workflow described below is functional and connected to a real MySQL database.

---

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Installation & Setup](#installation--setup)
7. [Environment Variables](#environment-variables)
8. [Admin Login Setup](#admin-login-setup)
9. [Running the Application](#running-the-application)
10. [Testing Checklist](#testing-checklist)
11. [Future Improvements](#future-improvements)

---

## Features

### Public / Visitor
- Landing page with hero, featured pets, stats, testimonials, categories, "how it works"
- Register / Login with JWT authentication, show/hide password, validation
- Browse & search pets, filter by category/breed/age/gender/size/location/status, sort, pagination
- Full pet details page with health, vaccination, temperament info
- Pet categories page (Dogs, Cats, Birds, Rabbits, Other)
- How Adoption Works & Adoption Guidelines pages
- Contact Us form (saved to MySQL)

### Registered User
- Separate User Dashboard (`/user/dashboard`) with stats, recent applications, recommended pets
- Favorite / unfavorite pets
- Submit a detailed adoption application per pet
- Track application status (Pending / Approved / Rejected / Completed) with admin remarks
- View adoption history
- Edit profile (name, phone, address, city, state, pincode, profile image)

### Admin
- Completely separate Admin Panel (`/admin/dashboard`) with its own dark sidebar layout
- Dashboard with stat cards + charts (pets by category, application status, monthly adoptions) via Recharts
- Full pet CRUD (add / edit / delete / search / filter / paginate)
- User management (view, block/unblock, delete)
- Adoption application management: approve / reject with remarks — approving a pet automatically marks it "Adopted" and auto-rejects other pending applications for that pet
- Contact message management (mark as read, delete)

### Security
- Passwords hashed with bcryptjs
- JWT-based authentication (`authenticateUser` middleware)
- Role-based authorization (`authorizeAdmin` middleware) — users cannot call admin-only APIs
- Centralized error handling middleware, no leaked stack traces in production
- CORS restricted to the configured client URL

---

## Technology Stack

**Frontend:** React 18, React Router DOM 6, Axios, Bootstrap 5, React Icons, Recharts, Vite
**Backend:** Node.js, Express.js, REST API, JWT, bcryptjs, CORS, dotenv
**Database:** MySQL 8 with Sequelize ORM

> **Note on IDs:** MySQL uses auto-incrementing integer primary keys (`id`). Every model's JSON output also includes an `_id` field (the same value, as a string) purely so the existing frontend code — written against a Mongo-style `_id` — keeps working unchanged. Internally and in the database, the real key is `id`.

---

## Folder Structure

```
pawcare/
├── backend/
│   ├── config/database.js       (Sequelize/MySQL connection)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── petController.js
│   │   ├── userController.js
│   │   ├── adoptionController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Pet.js
│   │   ├── Adoption.js
│   │   ├── Contact.js
│   │   ├── Favorite.js          (join table for User <-> Pet favorites)
│   │   └── index.js             (associations)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── petRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adoptionRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/generateToken.js
│   ├── seed/
│   │   ├── seedData.js   (30+ realistic pets)
│   │   └── seed.js       (imports pets + creates default admin)
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/     (Navbar, Footer, PetCard, SearchBar, FilterSidebar,
    │   │                     Loading, ProtectedRoute, AdminRoute)
    │   ├── pages/
    │   │   ├── public/     (Home, About, Pets, PetDetails, Categories,
    │   │   │                HowAdoptionWorks, Guidelines, Contact, Login, Register, NotFound)
    │   │   ├── user/       (UserDashboard, Profile, Favorites, MyApplications,
    │   │   │                AdoptionHistory, AdoptionForm, UserSidebar)
    │   │   └── admin/      (AdminDashboard, ManagePets, AddPet, EditPet, PetForm,
    │   │                    ManageUsers, ManageApplications, ManageMessages, AdminLayout)
    │   ├── services/       (api.js, authService, petService, adoptionService,
    │   │                     userService, contactService)
    │   ├── context/AuthContext.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

---

## Database Schema

Five MySQL tables, managed by Sequelize (`sequelize.sync()` creates them automatically — see Installation below):

**users**: id (PK), name, email (unique), phone, password (hashed), role (`user`/`admin`), profileImage, address, city, state, pincode, isBlocked, timestamps

**pets**: id (PK), name, category (`Dog|Cat|Bird|Rabbit|Other`), breed, age, gender, size, color, location, description, healthStatus, vaccinationStatus, temperament, goodWithChildren, goodWithPets, image, status (`Available|Pending|Adopted`), timestamps

**adoptions**: id (PK), userId (FK → users), petId (FK → pets), fullName, email, phone, address, homeType, ownershipStatus, familyMembers, previousPetExperience, workingHours, petCarePlan, reasonForAdoption, financiallyPrepared, agreementAccepted, status (`Pending|Approved|Rejected|Completed`), adminRemarks, timestamps

**contacts**: id (PK), name, email, phone, subject, message, status (`Unread|Read`), timestamps

**favorites**: id (PK), userId (FK → users), petId (FK → pets) — join table for the many-to-many User ⟷ Pet favorites relationship

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/auth/me` | Private | Get logged-in user |

### Pets
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/pets` | Public | List pets (search, filter, sort, pagination via query params) |
| GET | `/pets/:id` | Public | Get single pet |
| GET | `/pets/category/:category` | Public | Get pets by category |
| POST | `/pets` | Admin | Create pet |
| PUT | `/pets/:id` | Admin | Update pet |
| DELETE | `/pets/:id` | Admin | Delete pet |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/users` | Admin | List all users |
| GET | `/users/:id` | Private | Get a user |
| PUT | `/users/:id` | Private (self) / Admin | Update profile / block-unblock |
| DELETE | `/users/:id` | Admin | Delete user |
| GET | `/users/favorites` | Private | Get my favorites |
| POST | `/users/favorites/:petId` | Private | Add favorite |
| DELETE | `/users/favorites/:petId` | Private | Remove favorite |

### Adoptions
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/adoptions` | Private | Submit adoption application |
| GET | `/adoptions/my` | Private | My applications |
| GET | `/adoptions` | Admin | All applications (filter by `?status=`) |
| GET | `/adoptions/:id` | Private (owner) / Admin | Single application |
| PUT | `/adoptions/:id/status` | Admin | Approve / reject with remarks |

### Contact
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/contact` | Public | Submit contact message |
| GET | `/contact` | Admin | List messages |
| PUT | `/contact/:id/read` | Admin | Mark as read |
| DELETE | `/contact/:id` | Admin | Delete message |

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- MySQL 8 (or MySQL 5.7+) running locally, or a hosted MySQL instance (PlanetScale, RDS, etc.)

### 1. MySQL Setup
Start MySQL, then create a database and a user for the app:
```sql
CREATE DATABASE pawcare;
CREATE USER 'pawcare_user'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON pawcare.* TO 'pawcare_user'@'localhost';
FLUSH PRIVILEGES;
```
(If you're connecting over TCP to `127.0.0.1` rather than the `localhost` socket, also run the same `CREATE USER` / `GRANT` pair with `'pawcare_user'@'%'`.)

You do **not** need to create any tables by hand — Sequelize creates them automatically the first time the server or seed script runs (see below).

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env with your MySQL host/user/password/database, JWT secret, and admin credentials
npm run seed       # creates all tables, seeds 30+ pets, and creates the default admin
npm run dev         # starts the API on http://localhost:5000
```

> `npm run seed` runs `sequelize.sync({ force: true })`, which **drops and recreates every table** — perfect for a fresh dev/demo setup, but never run it against data you want to keep. Day-to-day, just use `npm run dev`; the server calls a non-destructive `sequelize.sync()` that only creates tables if they don't already exist.

### 3. Frontend Setup
```bash
cd frontendcd
npm install
cp .env.example .env
# edit .env if your backend runs on a different URL
npm run dev          # starts the app on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Environment Variables

**backend/.env**
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=pawcare
DB_USER=pawcare_user
DB_PASSWORD=your-password
JWT_SECRET=replace-this-with-a-long-random-secret
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@pawcare.com
ADMIN_PASSWORD=change-this-password
ADMIN_NAME=PawCare Admin
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

---

## Admin Login Setup

The default admin account is created by the seed script using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` values in `backend/.env`. **Change these before seeding in any shared or production environment.**

To change admin credentials later:
1. Update `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `backend/.env`
2. Run `npm run seed` again (⚠️ this drops and recreates all tables — pets/adoptions/contacts/users are wiped), **or**
3. Manually `UPDATE users SET ... WHERE role = 'admin'` in MySQL — but the password must be bcrypt-hashed first, so it's easiest to just re-run the seed script.

Log in at `/login` with the admin email/password — the app automatically redirects admins to `/admin/dashboard` and regular users to `/user/dashboard`.

---

## Running the Application

1. Start MySQL
2. `cd backend && npm run dev` (http://localhost:5000)
3. `cd frontend && npm run dev` (http://localhost:5173)
4. Visit the site, register a user, browse pets, submit an adoption application
5. Log in as admin to approve/reject applications, manage pets/users/messages

---

## Testing Checklist

### Authentication
- [ ] Register a new user
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should show error)
- [ ] Logout
- [ ] Protected routes redirect to `/login` when logged out
- [ ] Admin login redirects to `/admin/dashboard`

### Pets
- [ ] View pet list, pagination works
- [ ] Search by name/breed
- [ ] Filter by category, breed, gender, size, location, status
- [ ] Sort (newest, oldest, name A-Z/Z-A)
- [ ] View pet details
- [ ] Admin: add a pet
- [ ] Admin: edit a pet
- [ ] Admin: delete a pet

### Adoption
- [ ] Submit an adoption application (requires login)
- [ ] Application appears in "My Applications" as Pending
- [ ] Admin approves → pet status becomes "Adopted", other pending apps for that pet auto-reject
- [ ] Admin rejects → pet stays "Available", remarks visible to user

### Favorites
- [ ] Add a pet to favorites
- [ ] Remove a pet from favorites
- [ ] View favorites list

### Contact
- [ ] Submit a contact message
- [ ] Admin views messages, marks as read, deletes

### Security
- [ ] A logged-in normal user cannot open `/admin/*` pages (redirected home)
- [ ] Calling admin-only APIs without an admin token returns 403
- [ ] Passwords are stored hashed in MySQL (never plain text)
- [ ] Invalid/expired JWT is rejected with 401

---

## Future Improvements
- Image upload via Cloudinary/Multer instead of image URLs
- Email notifications (Nodemailer) on application status changes
- Advanced admin reports/export (CSV/PDF)
- Pet comparison and saved search alerts
- Multi-image galleries per pet

---

## Screenshots
*(Add screenshots of the Home page, Pets page, Pet Details, User Dashboard, and Admin Dashboard here for your portfolio/resume submission.)*
