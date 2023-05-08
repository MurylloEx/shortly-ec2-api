#!/bin/sh
set -e

echo "[🚀] Running step 'AfterInstall'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Installing dependencies..."
sudo npm install
echo "[🚀] Installed dependencies..."

echo "[🚀] Building NestJS application..."
sudo npm run build
echo "[🚀] NestJS application built successfully..."
