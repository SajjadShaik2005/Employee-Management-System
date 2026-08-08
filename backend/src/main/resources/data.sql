-- ============================================================
--  Seed Data — Employee Management System
--  Runs automatically after Hibernate creates the schema
-- ============================================================

-- Departments
INSERT INTO departments (name, description, created_at, updated_at) VALUES
('Engineering',      'Software development, architecture & infrastructure', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Human Resources',  'Talent acquisition, onboarding & employee relations',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marketing',        'Brand management, growth strategies & communications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Finance',          'Financial planning, accounting & compliance',           CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Operations',       'Business operations, logistics & process improvement',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Engineering (dept 1)
INSERT INTO employees (first_name, last_name, email, phone, job_title, salary, hire_date, status, department_id, created_at, updated_at) VALUES
('Alice',   'Johnson',   'alice.johnson@ems.dev',   '+12025551001', 'Senior Software Engineer',  95000.00, '2022-03-15', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bob',     'Martinez',  'bob.martinez@ems.dev',    '+12025551002', 'DevOps Engineer',            88000.00, '2021-07-01', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Carol',   'White',     'carol.white@ems.dev',     '+12025551003', 'Full-Stack Developer',       82000.00, '2023-01-10', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('David',   'Lee',       'david.lee@ems.dev',       '+12025551004', 'QA Engineer',                75000.00, '2022-09-20', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Emma',    'Davis',     'emma.davis@ems.dev',      '+12025551005', 'Cloud Architect',           112000.00, '2020-06-05', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Frank',   'Wilson',    'frank.wilson@ems.dev',    '+12025551006', 'Junior Developer',           58000.00, '2024-02-01', 'ACTIVE',   1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Human Resources (dept 2)
('Grace',   'Taylor',    'grace.taylor@ems.dev',    '+12025551007', 'HR Manager',                 78000.00, '2020-11-15', 'ACTIVE',   2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Henry',   'Anderson',  'henry.anderson@ems.dev',  '+12025551008', 'Recruiter',                  62000.00, '2022-05-20', 'ACTIVE',   2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Iris',    'Thomas',    'iris.thomas@ems.dev',     '+12025551009', 'HR Coordinator',             55000.00, '2023-08-01', 'ON_LEAVE', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Marketing (dept 3)
('Jack',    'Jackson',   'jack.jackson@ems.dev',    '+12025551010', 'Marketing Director',         98000.00, '2019-04-12', 'ACTIVE',   3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Karen',   'Harris',    'karen.harris@ems.dev',    '+12025551011', 'Content Strategist',         65000.00, '2021-10-05', 'ACTIVE',   3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Liam',    'Martin',    'liam.martin@ems.dev',     '+12025551012', 'SEO Specialist',             60000.00, '2022-03-18', 'INACTIVE', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mia',     'Thompson',  'mia.thompson@ems.dev',    '+12025551013', 'Social Media Manager',       68000.00, '2023-05-22', 'ACTIVE',   3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Finance (dept 4)
('Noah',    'Garcia',    'noah.garcia@ems.dev',     '+12025551014', 'Chief Financial Officer',   145000.00, '2018-01-08', 'ACTIVE',   4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Olivia',  'Martinez',  'olivia.martinez@ems.dev', '+12025551015', 'Financial Analyst',          72000.00, '2021-07-14', 'ACTIVE',   4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Peter',   'Robinson',  'peter.robinson@ems.dev',  '+12025551016', 'Accountant',                 65000.00, '2022-11-30', 'ACTIVE',   4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Operations (dept 5)
('Quinn',   'Clark',     'quinn.clark@ems.dev',     '+12025551017', 'Operations Manager',         90000.00, '2019-09-23', 'ACTIVE',   5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rachel',  'Lewis',     'rachel.lewis@ems.dev',    '+12025551018', 'Business Analyst',            70000.00, '2021-02-17', 'ACTIVE',   5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sam',     'Walker',    'sam.walker@ems.dev',      '+12025551019', 'Supply Chain Coordinator',   62000.00, '2023-06-01', 'ON_LEAVE', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tina',    'Hall',      'tina.hall@ems.dev',       '+12025551020', 'Process Improvement Lead',   80000.00, '2020-08-11', 'ACTIVE',   5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
