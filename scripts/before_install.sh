#!/bin/sh
set -e

echo "[🚀] Running step 'BeforeInstall'..."
echo "[🚀] Installing dependencies..."

cd /home/ubuntu/code-deploy/shortly-backend
sudo npm install

echo "[🚀] Installed dependencies..."
