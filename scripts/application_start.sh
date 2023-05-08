#!/bin/sh
set -e

echo "[🚀] Running step 'ApplicationStart'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Running npm script 'start:prod'..."
sudo systemctl start shortly-backend
echo "[🚀] Application started successfully."
