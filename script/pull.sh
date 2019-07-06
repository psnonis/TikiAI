#!/bin/bash

context=${1-pythia}
repository=psnonis/w251-final
tagname=${context}

echo Pulling ${repository}:${tagname}
echo docker pull ${repository}:${tagname}
     docker pull ${repository}:${tagname}