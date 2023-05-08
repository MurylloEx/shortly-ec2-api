#!/bin/sh
set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "[🚀] Running step 'BeforeInstall'..."
echo "[🚀] Setting permissions to run scripts..."

sudo chmod -R +x ../aws
sudo chmod -R +x ../server
