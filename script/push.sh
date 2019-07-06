#!/bin/bash

context=${1-pythia}
repository=psnonis/w251-final
tagname=${context}

echo Pushing ${repository}:${tagname}
echo docker push ${repository}:${tagname}
     docker push ${repository}:${tagname}