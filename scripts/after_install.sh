#!/bin/sh
echo "[🚀] Running step 'AfterInstall'..."
cd /home/ubuntu/code-deploy/shortly-backend

echo "[🚀] Building NestJS application..."
npm run build
echo "[🚀] NestJS application built successfully..."
