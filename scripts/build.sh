#!/bin/bash

tagname=${1-pythia}
repository=psnonis/w251-final
containers=containers

echo Building ${repository}:${tagname}
echo docker build -t ${repository}:${tagname} -f ${containers}/Dockerfile.${tagname} ${containers} | tee ${containers}/build.${tagname}.log | ack --passthru '^Step.*'
     docker build -t ${repository}:${tagname} -f ${containers}/Dockerfile.${tagname} ${containers} | tee ${containers}/build.${tagname}.log | ack --passthru '^Step.*'
