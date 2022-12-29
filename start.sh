#!/bin/bash
PWD=$(pwd)
source ~/.nvm/nvm.sh
echo "Starting API..."
cd /app/api && npm start 2>&1 >> /app/api.log &
echo "Done!"
cd "$PWD"

echo "Starting Client..."
cd /app/client && npm start 2>&1 >> /app/app.log &
echo "Done!"

while :
do
  echo "System keep-alive to prevent container from exiting."
  CHECK=$(ps aux | grep node)

  if [[ -z "$CHECK" ]]
  then
  echo "Detected application has ended."
    exit 1
  fi

  sleep 5
done
