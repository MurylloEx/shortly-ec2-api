#!/bin/sh

echo "[🚀] Running step 'ApplicationStart'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Running npm script 'start:prod'..."
npm run start:prod
echo "[🚀] Application started successfully."
