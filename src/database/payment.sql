CREATE TABLE IF NOT EXISTS payments (
    id             SERIAL PRIMARY KEY,
    member_id      INT            NOT NULL
                     REFERENCES members(id) ON DELETE CASCADE,
    amount         NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(50)    NOT NULL
                     CHECK (payment_method IN ('cash', 'card', 'upi', 'netbanking')),
    payment_date   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments (member_id);