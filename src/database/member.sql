CREATE TABLE IF NOT EXISTS members (
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(100) NOT NULL,
    email             VARCHAR(100) UNIQUE NOT NULL,
    membership_type   VARCHAR(50)  NOT NULL
                        CHECK (membership_type IN ('monthly', 'quarterly', 'annual')),
    membership_start  DATE         NOT NULL DEFAULT CURRENT_DATE,
    membership_end    DATE,
    membership_status VARCHAR(20)  NOT NULL DEFAULT 'inactive'
                        CHECK (membership_status IN ('active', 'inactive', 'expired')),
    join_date         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_members_membership_end
    ON members (membership_end)
    WHERE membership_status != 'expired';