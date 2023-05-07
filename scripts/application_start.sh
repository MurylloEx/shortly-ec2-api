#!/bin/sh
set -e

echo "[🚀] Running step 'ApplicationStart'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Running npm script 'start:prod'..."
sudo nohup npm start:prod > service.log &
echo "[🚀] Application started successfully."
