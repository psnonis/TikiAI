#!/bin/bash

tagname=${1-pythia}
repository=psnonis/w251-final
containers=containers

echo Running ${repository}:${tagname}
echo docker run --rm -v ${containers}:/final/context -it ${repository}:${tagname} bash
     docker run --rm -v ${containers}:/final/context -it ${repository}:${tagname} bash