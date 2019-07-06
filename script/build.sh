#!/bin/bash

context=${1-pythia}
repository=psnonis/w251-final
tagname=${context}

echo Building ${repository}:${tagname}
echo docker build -t ${repository}:${tagname} ${context} | tee ${context}/build.log | ack --passthru '^Step.*'
     docker build -t ${repository}:${tagname} ${context} | tee ${context}/build.log | ack --passthru '^Step.*'
