#!/bin/sh
echo "[🚀] Running step 'ApplicationStop'..."
echo "[🚀] Killing process in port 8192 using 'fuser' command..."

sudo systemctl stop shortly-backend

echo "[🚀] Process successfully killed..."
