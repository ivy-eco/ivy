#!/bin/bash
set -e

DB_NAME="ivy_db"

echo "Creating db: $DB_NAME"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME') THEN
            CREATE DATABASE "$DB_NAME";
        END IF;
    END
    \$\$ LANGUAGE plpgsql;
EOSQL

echo "Database '$DB_NAME' ready."