#!/usr/bin/env bash

clear
docker run -d --name mongo mongo 2> /dev/null
export MONGO_URL="mongodb://localhost:27017/meteor"
meteor