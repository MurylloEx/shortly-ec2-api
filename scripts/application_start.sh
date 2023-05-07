#!/bin/sh
set -e

echo "[🚀] Running step 'ApplicationStart'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Running npm script 'start:prod'..."
sudo nohup npm run start:prod &
echo "[🚀] Application started successfully."
