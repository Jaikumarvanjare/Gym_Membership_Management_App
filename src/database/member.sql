CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    membership_type VARCHAR(50) NOT NULL,
    membership_start DATE DEFAULT CURRENT_DATE,
    membership_end DATE,
    membership_status VARCHAR(20) DEFAULT 'inactive',
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);