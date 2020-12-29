#!/bin/bash
clear
echo "Stoping all containers..."
sudo docker stop $(docker ps -a -q)

echo "Removing all containers..."
sudo docker rm $(docker ps -a -q)

echo "Building image..."
sudo docker build -f ./Dockerfile -t futsal-bot .

echo "Running image with NoVNC."
sudo docker run -d -p 3000:3333 -p 26901:6901 --name futsal -t futsal-bot

echo "OS Server"
echo "Host NoVNC: http://172.17.0.2:6901/vnc_lite.html"
echo "Password: headless"
echo ""

# Enter execute.
sudo docker exec -d -it futsal bash /usr/src/app/scripts/openCloseChrome.sh
# sudo docker exec -d -it futsal bash /usr/src/app/scripts/openCloseChromeHidden.sh
sudo docker exec -d -it futsal node /usr/src/app/src/server.js

echo "Node Server"
echo "Host: http://172.17.0.2:3000"
echo "Status: http://172.17.0.2:3000/status"