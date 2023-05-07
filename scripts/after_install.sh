#!/bin/sh
set -e

echo "[🚀] Running step 'AfterInstall'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Building NestJS application..."
sudo npm run build
echo "[🚀] NestJS application built successfully..."
