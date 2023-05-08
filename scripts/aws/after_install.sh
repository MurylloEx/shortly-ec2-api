#!/bin/sh
set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "[🚀] Running step 'AfterInstall'..."
echo "[🚀] Installing dependencies..."
sudo npm install
echo "[🚀] Installed dependencies..."

echo "[🚀] Building NestJS application..."
sudo npm run build
echo "[🚀] NestJS application built successfully..."
