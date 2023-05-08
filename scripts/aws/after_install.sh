#!/bin/sh
set -e

echo "[🚀] Running step 'AfterInstall'..."
cd /home/ubuntu/code-deploy/prod-shortly

echo "[🚀] Installing dependencies..."
sudo npm install
echo "[🚀] Installed dependencies..."

echo "[🚀] Building NestJS application..."
sudo npm run build
echo "[🚀] NestJS application built successfully..."
