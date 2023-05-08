#!/bin/sh
set -e

echo "[🚀] Working dir: $(pwd)"

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "[🚀] Working dir: $(pwd)"
echo "[🚀] Running step 'BeforeInstall'..."
echo "[🚀] Setting permissions to run scripts..."

cd ..

sudo chmod -R +x aws
sudo chmod -R +x server
