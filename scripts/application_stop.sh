#!/bin/sh
set -e

echo "[🚀] Running step 'ApplicationStop'..."
echo "[🚀] Killing process in port 8192 using 'fuser' command..."

fuser -k 8192/tcp

echo "[🚀] Process successfully killed..."