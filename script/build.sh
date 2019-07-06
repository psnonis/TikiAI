#!/bin/bash

image=${1-pythia}
echo Building ${image}
docker build -t w251-final/${image} ${image} | tee ${image}/build.log | ack --passthru '^Step.*'