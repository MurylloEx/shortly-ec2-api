#!/bin/sh
echo "[🚀] Running step 'ApplicationStop'..."
echo "[🚀] Killing process in port 8192 using 'fuser' command..."

sudo fuser -k 8192/tcp

echo "[🚀] Process successfully killed..."