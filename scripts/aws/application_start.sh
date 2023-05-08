#!/bin/sh
set -e

echo "[🚀] Running step 'ApplicationStart'..."

echo "[🚀] Running npm script 'start:prod'..."
sudo systemctl start shortly
echo "[🚀] Application started successfully."
