#!/bin/bash

      root=$(readlink -f ${0} | xargs dirname | xargs dirname)
containers=$(realpath --relative-to=${PWD} ${root}/containers)
   context=${1-pythia}
    expose=${2-5000}
repository=psnonis/w251-final

curl \
  -X POST \
  -F "image=@${containers}/${context}/africa.jpg" \
  localhost:5000/api/divine?question='where%20is%20this%20place%20%3F'