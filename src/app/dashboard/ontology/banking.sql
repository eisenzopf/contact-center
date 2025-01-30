-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Core Tables
CREATE TABLE account_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    eligibility TEXT,
    fees TEXT,
    interest TEXT,
    term TEXT,
    monthly_payment REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lifecycles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE account_type_lifecycles (
    account_type_id INTEGER,
    lifecycle_id INTEGER,
    sequence_order INTEGER NOT NULL,
    requirements TEXT,
    estimated_duration TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (account_type_id, lifecycle_id),
    FOREIGN KEY (account_type_id) REFERENCES account_types(id) ON DELETE CASCADE,
    FOREIGN KEY (lifecycle_id) REFERENCES lifecycles(id) ON DELETE CASCADE,
    UNIQUE (account_type_id, sequence_order)
);

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tenure INTEGER,
    persona TEXT,
    profile TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    persona TEXT,
    profile TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_number TEXT NOT NULL UNIQUE,
    balance REAL,
    ledger TEXT,
    account_type_id INTEGER,
    customer_id INTEGER,
    current_lifecycle_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (current_lifecycle_id) REFERENCES lifecycles(id)
);

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_type TEXT NOT NULL,
    transaction_date TEXT,
    description TEXT,
    amount REAL,
    account_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Call Drivers and Related Tables
CREATE TABLE call_drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    chance_of_call REAL CHECK (chance_of_call >= 0 AND chance_of_call <= 1),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    call_date TEXT,
    customer_id INTEGER,
    employee_id INTEGER,
    department_id INTEGER,
    call_driver_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id)
);

CREATE TABLE scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    outline TEXT,
    duration TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Persona Tables
CREATE TABLE employee_personas (
    persona_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer_personas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    family_name TEXT NOT NULL,
    sub_persona_name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(family_name, sub_persona_name)
);

-- Attributes Table with Triggers
CREATE TABLE attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('call', 'call_driver', 'scenario')),
    entity_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name, entity_type, entity_id)
);

-- Junction Tables
CREATE TABLE call_driver_employee_personas (
    call_driver_id INTEGER,
    employee_persona_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (call_driver_id, employee_persona_id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_persona_id) REFERENCES employee_personas(persona_id) ON DELETE CASCADE
);

CREATE TABLE call_driver_customer_personas (
    call_driver_id INTEGER,
    customer_persona_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (call_driver_id, customer_persona_id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_persona_id) REFERENCES customer_personas(id) ON DELETE CASCADE
);

CREATE TABLE call_driver_departments (
    call_driver_id INTEGER,
    department_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (call_driver_id, department_id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE call_driver_account_types (
    call_driver_id INTEGER,
    account_type_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (call_driver_id, account_type_id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id) ON DELETE CASCADE
);

CREATE TABLE call_driver_account_type_lifecycles (
    call_driver_id INTEGER,
    account_type_id INTEGER,
    lifecycle_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (call_driver_id, account_type_id, lifecycle_id),
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id) ON DELETE CASCADE,
    FOREIGN KEY (lifecycle_id) REFERENCES lifecycles(id) ON DELETE CASCADE
);

CREATE TABLE scenario_call_drivers (
    scenario_id INTEGER,
    call_driver_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (scenario_id, call_driver_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (call_driver_id) REFERENCES call_drivers(id) ON DELETE CASCADE
);

CREATE TABLE scenario_account_types (
    scenario_id INTEGER,
    account_type_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (scenario_id, account_type_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id) ON DELETE CASCADE
);

CREATE TABLE scenario_departments (
    scenario_id INTEGER,
    department_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (scenario_id, department_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE call_transactions (
    call_id INTEGER,
    transaction_id INTEGER,
    PRIMARY KEY (call_id, transaction_id),
    FOREIGN KEY (call_id) REFERENCES calls(id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

CREATE TABLE scenario_customers (
    scenario_id INTEGER,
    customer_id INTEGER,
    PRIMARY KEY (scenario_id, customer_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE scenario_employees (
    scenario_id INTEGER,
    employee_id INTEGER,
    PRIMARY KEY (scenario_id, employee_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE scenario_transactions (
    scenario_id INTEGER,
    transaction_id INTEGER,
    PRIMARY KEY (scenario_id, transaction_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

CREATE TABLE scenario_accounts (
    scenario_id INTEGER,
    account_id INTEGER,
    PRIMARY KEY (scenario_id, account_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Attribute Referential Integrity Triggers
CREATE TRIGGER fki_attributes_call
BEFORE INSERT ON attributes
WHEN NEW.entity_type = 'call'
BEGIN
    SELECT CASE 
        WHEN (SELECT id FROM calls WHERE id = NEW.entity_id) IS NULL
        THEN RAISE(ROLLBACK, 'Foreign key violation: value of entity_id not found in calls')
    END;
END;

CREATE TRIGGER fki_attributes_call_driver
BEFORE INSERT ON attributes
WHEN NEW.entity_type = 'call_driver'
BEGIN
    SELECT CASE 
        WHEN (SELECT id FROM call_drivers WHERE id = NEW.entity_id) IS NULL
        THEN RAISE(ROLLBACK, 'Foreign key violation: value of entity_id not found in call_drivers')
    END;
END;

CREATE TRIGGER fki_attributes_scenario
BEFORE INSERT ON attributes
WHEN NEW.entity_type = 'scenario'
BEGIN
    SELECT CASE 
        WHEN (SELECT id FROM scenarios WHERE id = NEW.entity_id) IS NULL
        THEN RAISE(ROLLBACK, 'Foreign key violation: value of entity_id not found in scenarios')
    END;
END;

CREATE TRIGGER fkd_attributes_call
AFTER DELETE ON calls
BEGIN
    DELETE FROM attributes WHERE entity_type = 'call' AND entity_id = OLD.id;
END;

CREATE TRIGGER fkd_attributes_call_driver
AFTER DELETE ON call_drivers
BEGIN
    DELETE FROM attributes WHERE entity_type = 'call_driver' AND entity_id = OLD.id;
END;

CREATE TRIGGER fkd_attributes_scenario
AFTER DELETE ON scenarios
BEGIN
    DELETE FROM attributes WHERE entity_type = 'scenario' AND entity_id = OLD.id;
END;

-- Updated_at Triggers
CREATE TRIGGER update_account_type_timestamp 
    AFTER UPDATE ON account_types
BEGIN
    UPDATE account_types SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_account_timestamp 
    AFTER UPDATE ON accounts
BEGIN
    UPDATE accounts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_account_type_lifecycle_timestamp 
    AFTER UPDATE ON account_type_lifecycles
BEGIN
    UPDATE account_type_lifecycles SET updated_at = CURRENT_TIMESTAMP 
    WHERE account_type_id = NEW.account_type_id AND lifecycle_id = NEW.lifecycle_id;
END;

CREATE TRIGGER update_attribute_timestamp 
    AFTER UPDATE ON attributes
BEGIN
    UPDATE attributes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Account Type Lifecycle Validation Trigger
CREATE TRIGGER check_valid_account_type_lifecycle
BEFORE INSERT ON call_driver_account_type_lifecycles
BEGIN
    SELECT RAISE(ROLLBACK, 'Invalid account_type and lifecycle combination')
    WHERE NOT EXISTS (
        SELECT 1 FROM account_type_lifecycles 
        WHERE account_type_id = NEW.account_type_id 
        AND lifecycle_id = NEW.lifecycle_id
    );
END;

-- Default Data
INSERT INTO departments (name) VALUES 
    ('Personal'),
    ('Business'),
    ('Loans'),
    ('Fraud'),
    ('Wealth'),
    ('Collections');

INSERT INTO lifecycles (name, description) VALUES 
    ('Application', 'Initial application and documentation phase'),
    ('Approval', 'Review and approval process'),
    ('Opening', 'Account opening and setup'),
    ('Funding', 'Initial funding of the account'),
    ('Servicing', 'Regular account maintenance and transactions'),
    ('Review', 'Periodic account review and maintenance'),
    ('Dormant', 'Period of inactivity'),
    ('Closing', 'Account closure process'),
    ('Archived', 'Post-closure record keeping');

-- Indexes
CREATE INDEX idx_attributes_entity ON attributes(entity_type, entity_id);
CREATE INDEX idx_attributes_name ON attributes(name);
CREATE INDEX idx_scenario_call_drivers ON scenario_call_drivers(scenario_id, call_driver_id);
CREATE INDEX idx_accounts_customer ON accounts(customer_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_calls_customer ON calls(customer_id);
CREATE INDEX idx_calls_employee ON calls(employee_id);
CREATE INDEX idx_calls_department ON calls(department_id);
CREATE INDEX idx_calls_call_driver ON calls(call_driver_id);
CREATE INDEX idx_account_type_lifecycles_order ON account_type_lifecycles(account_type_id, sequence_order);
CREATE INDEX idx_accounts_lifecycle ON accounts(current_lifecycle_id);
CREATE INDEX idx_call_driver_departments ON call_driver_departments(call_driver_id, department_id);
CREATE INDEX idx_call_driver_account_types ON call_driver_account_types(call_driver_id, account_type_id);
CREATE INDEX idx_call_driver_account_type_lifecycles ON call_driver_account_type_lifecycles(call_driver_id, account_type_id, lifecycle_id);
CREATE INDEX idx_call_driver_employee_personas ON call_driver_employee_personas(call_driver_id, employee_persona_id);
CREATE INDEX idx_call_driver_customer_personas ON call_driver_customer_personas(call_driver_id, customer_persona_id);