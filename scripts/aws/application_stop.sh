#!/bin/sh
cd "$(dirname "${BASH_SOURCE[0]}")"

echo "[🚀] Working dir: $(pwd)"
echo "[🚀] Running step 'ApplicationStop'..."
echo "[🚀] Killing process in port 8192 using 'fuser' command..."

sudo systemctl stop shortly

echo "[🚀] Process successfully killed..."
