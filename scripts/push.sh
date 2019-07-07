#!/bin/bash

tagname=${1-pythia}
repository=psnonis/w251-final
containers=containers

echo Pushing ${repository}:${tagname}
echo docker push ${repository}:${tagname}
     docker push ${repository}:${tagname}