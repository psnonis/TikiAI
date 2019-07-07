#!/bin/bash

      root=$(readlink -f ${0} | xargs dirname | xargs dirname)
containers=$(realpath --relative-to=${PWD} ${root}/containers)
   context=${1-pythia}
repository=psnonis/w251-final

PAD=$'\x1B[K'
SKY=$'\x1B[0;37;44m'
GRN=$'\x1B[0;30;42m'
TXT=$'\x1B[38;5;190m'
RST=$'\x1B[0m'
EOL=$'\n'

command="docker run --rm -v ${containers}/${context}:/final/context -it ${repository}:${context} bash"
 header="Container : ${repository}:${context} ${PAD}${EOL}   Command : ${command}"

echo -e "${EOL}${SKY}${TXT}${PAD}${EOL} ${header} ${PAD}${EOL}${PAD}${RST}${EOL}"

${command}

echo -e "${EOL}${SKY}${TXT}${PAD}${RST}${EOL}"