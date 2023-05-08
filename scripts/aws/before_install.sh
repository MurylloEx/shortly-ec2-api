#!/bin/sh
set -e

cd /home/ubuntu/code-deploy/prod-shortly/scripts

echo "[🚀] Working dir: $(pwd)"
echo "[🚀] Running step 'BeforeInstall'..."
echo "[🚀] Setting permissions to run scripts..."

sudo chmod -R +x aws
sudo chmod -R +x server
