#!/bin/sh
set -e

cd /home/ubuntu/code-deploy/prod-shortly

echo "[🚀] Working dir: $(pwd)"
echo "[🚀] Running step 'AfterInstall'..."

echo "[🚀] Installing dependencies..."
sudo npm install
echo "[🚀] Installed dependencies..."

echo "[🚀] Building NestJS application..."
sudo npm run build
echo "[🚀] NestJS application built successfully..."
