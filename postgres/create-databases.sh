#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "Creating user and database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $database PASSWORD '$database';
	    CREATE DATABASE $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRES_DB" ]; then
	echo "Creating databases: $POSTGRES_DBS"
    for db in $(echo $POSTGRES_DB | tr ',' ' '); do
		create_user_and_database $db
	done
    echo "Multiple database creation finished"
fi