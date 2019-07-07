#!/bin/bash

tagname=${1-pythia}
repository=psnonis/w251-final
containers=containers

echo Pulling ${repository}:${tagname}
echo docker pull ${repository}:${tagname}
     docker pull ${repository}:${tagname}