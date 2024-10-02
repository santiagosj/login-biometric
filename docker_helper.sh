#!/bin/bash

# Author: [Santi]

declare -A containers=(
    ["redis"]="sudo docker-compose up redis"
    ["backend"]="sudo docker-compose up backend"
    ["frontend"]="sudo docker-compose up frontend"
    ["service"]="sudo docker-compose up redis backend"
    ["all"]="sudo docker-compose up --build"
)

start_containers(){
    local container=$1

    if [[-n "${containers[container]}"]]; then
      echo "Upcomming $container..."
      ${containers[container]}
    else
    echo "Container not found"
    exit 1
    fi
}

stop_containers(){
    echo "Stoping containers and cleaning redis..."
    sudo docker-compose down --remove-orphans
    echo "Stoping readis services..."
    sudo systemctl stop redis
}

# Main
if [[ $1 == "stop" ]]; then
stop_containers
else
start_containers $1
fi