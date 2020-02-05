#!/usr/bin/env sh
case $1 in
  api )
  cd /app/api/ && npm start
    ;;
  client )
  cd /app/client && npm start
    ;;
  * )
  echo "The only two supported run modes are client and api, giving you a shell instead."
  /bin/sh
    ;;
esac
