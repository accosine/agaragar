#!/bin/sh
set -e

# allow the container to be started with `--user`
if [ "$1" = 'npm' -a "$(id -u)" = '0' ]; then
  chown -R app .
  exec su-exec app "$@"
fi

exec "$@"
