#!/bin/bash

# Author: [Santi]
# ENV_FILE="./.env"

declare -A containers=(
    ["redis"]="sudo docker-compose up redis"
    ["backend"]="sudo docker-compose up backend"
    ["frontend"]="sudo docker-compose up frontend"
    ["service"]="sudo docker-compose up redis backend"
    ["all"]="sudo docker-compose up --build"
)

# modify_persistence(){
#     local persist=$1

#     if [[ "$persist" == "true" || "$persist" == "false" ]]; then
#         echo "Modificando DB Persistence a: $persist"

#         # Verificamos si el archivo existe
#         if [[ -f "$ENV_FILE" ]]; then
#             # Ejecutar sed solo si el archivo existe
#             sed -i "s/^PERSISTENCE_DB=.*/PERSISTENCE_DB=$persist/" "$ENV_FILE"

#             # Verificamos si sed hizo cambios
#             if grep -q "PERSISTENCE_DB=$persist" "$ENV_FILE"; then
#                 echo "DB Persistence modificada con éxito."
#             else
#                 echo "Error: No se pudo modificar el archivo .env."
#             fi
#         else
#             echo "Error: El archivo $ENV_FILE no existe."
#             exit 1
#         fi
#     else
#         echo "Error: Persistence debe ser true o false."
#         exit 1
#     fi
# }

start_containers(){
    local container=$1

    if [[ -n "${containers[$container]}" ]]; then
      echo "Upcomming $container..."
      ${containers[$container]}
    else
    echo "Container not found: $container Command expected: $containers"
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
# elif [[ $1 == "persist" ]]; then
#     modify_persistence $2  # Modifica el archivo .env
else
    # Si $2 no está vacío, asume que es la persistencia
    # if [[ -n "$2" ]]; then
    #     modify_persistence $2
    # fi
    start_containers $1
fi
