#!/bin/sh
set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "[🚀] Working dir: $(pwd)"
echo "[🚀] Running step 'ApplicationStart'..."
echo "[🚀] Running npm script 'start:prod'..."
sudo systemctl start shortly
echo "[🚀] Application started successfully."
