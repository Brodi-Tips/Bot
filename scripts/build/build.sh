#!/bin/bash
clear
echo "Stoping all containers..."
sudo docker stop $(docker ps -a -q)

echo "Removing all containers..."
sudo docker rm $(docker ps -a -q)

echo "Building image..."
sudo docker build -f ./Dockerfile -t futsal-bot .

echo "Running image..."
sudo docker run -t  futsal-bot 
# sudo docker run -t -d --name futsal futsal-bot 

# sudo docker exec -it futsal /bin/bash

# sudo docker ps
