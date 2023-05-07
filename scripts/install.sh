#!/bin/sh
set -e

echo "[🚀] Running step 'Install'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Installing dependencies..."
sudo npm install
