# 🏢 Employee Management System

A full-stack **Employee Management System** built with **Java Spring Boot 3** + **React 18**.  
Zero database setup required — uses an **H2 in-memory database** seeded with demo data.

---

## ✨ Features

| Area | Details |
|------|---------|
| **Employees** | Create, Read, Update, Delete with validation |
| **Search & Filter** | Full-text search + department + status filters |
| **Pagination** | Server-side pagination on all list endpoints |
| **Departments** | Full CRUD with employee count & safe-delete |
| **Dashboard** | Stats cards, bar chart (dept headcount), donut chart (status), recent hires |
| **Validation** | Bean Validation on backend + client-side form validation |
| **Error Handling** | Global `@ControllerAdvice` with structured JSON responses |
| **Seed Data** | 20 employees across 5 departments loaded automatically |

---

## 🏗️ Architecture

```
┌──────────────────────────────┐
│     React 18 + Vite          │  ← Port 5173
│  (Recharts, React Router v6) │
└──────────┬───────────────────┘
           │ REST / Axios proxy
┌──────────▼───────────────────┐
│    Spring Boot 3 REST API    │  ← Port 8080
│  Controller → Service →      │
│  Repository → H2 Database    │
└──────────────────────────────┘
```

## 📁 Project Structure

```
employee-management-system/
├── backend/                   # Spring Boot (Maven)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/ems/
│       │   ├── controller/    # REST controllers
│       │   ├── service/       # Business logic
│       │   ├── repository/    # Spring Data JPA
│       │   ├── model/         # JPA entities
│       │   ├── dto/           # Data Transfer Objects
│       │   ├── exception/     # Global error handling
│       │   └── config/        # CORS config
│       └── resources/
│           ├── application.properties
│           └── data.sql       # Seed data
└── frontend/                  # React + Vite
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── api/               # Axios API clients
        ├── components/        # Reusable UI components
        └── pages/             # Dashboard, Employees, Departments
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven** — bundled via Maven Wrapper (`./mvnw`)
- **Node.js 18+** — [Download](https://nodejs.org/)

### 1. Start the Backend

```bash
cd backend
./mvnw spring-boot:run          # Linux/macOS
mvnw.cmd spring-boot:run        # Windows
```

The API will be available at `http://localhost:8080/api`  
H2 console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:emsdb`, user: `sa`, no password)

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🌐 API Reference

### Employees — `GET /api/employees`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List employees (paginated) |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/search?q=&departmentId=&status=` | Search & filter |
| GET | `/api/employees/stats` | Dashboard statistics |

### Departments — `/api/departments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | List all departments |
| GET | `/api/departments/{id}` | Get by ID |
| POST | `/api/departments` | Create department |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

### Response Format

All endpoints return a consistent JSON wrapper:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate |
| Database | H2 (in-memory, auto-seeded) |
| Validation | Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Email`, etc.) |
| Frontend | React 18, Vite 5 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | React Icons |
| Design | Dark glassmorphism, Inter font, CSS Variables |

---

## 🗃️ Database Schema

### departments
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | PK, auto-increment |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| description | VARCHAR(255) | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### employees
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | PK, auto-increment |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | NOT NULL, UNIQUE |
| phone | VARCHAR(20) | |
| job_title | VARCHAR(100) | |
| salary | DECIMAL(15,2) | |
| hire_date | DATE | |
| status | VARCHAR(20) | ACTIVE / INACTIVE / ON_LEAVE |
| department_id | BIGINT | FK → departments.id |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

---

## 🔄 Switch to MySQL (Optional)

To use MySQL instead of H2, update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.h2.console.enabled=false
```

And add MySQL dependency to `pom.xml`:
```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

---

## 📸 Screenshots

| Dashboard | Employees | Departments |
|-----------|-----------|-------------|
| Stats + Charts | Search, Filter, Table | Card Grid |

---

## 📄 License

MIT License — feel free to use this project however you like!
