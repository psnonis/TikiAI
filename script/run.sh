#!/bin/bash

context=${1-pythia}
repository=psnonis/w251-final
tagname=${context}

echo Running ${repository}:${tagname}
echo docker run --rm -v ${context}:/final/context -it ${repository}:${tagname} bash
     docker run --rm -v ${context}:/final/context -it ${repository}:${tagname} bash