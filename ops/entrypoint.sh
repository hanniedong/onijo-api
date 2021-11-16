#!/bin/sh
set -e

if [[ "$WAIT_FOR_DB" = "true" ]]; then
  ./ops/wait-for-it.sh -h $DB_HOST -p $DB_PORT -t 20
fi

if [[ "$RUN_MIGRATIONS_ON_START" = "true" ]]; then
  yarn typeorm:migrate
fi

exec "$@"