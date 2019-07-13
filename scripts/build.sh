#!/bin/bash

      root=$(readlink -f ${0} | xargs dirname | xargs dirname)
containers=$(realpath --relative-to=${PWD} ${root}/containers)
   context=${1-pythia}
    expose=${2-5000}
repository=psnonis/w251-final

highlight () { sed -u -r 's/(Step.*)/\n\1\n/g' | GREP_COLOR='00;38;5;1;48;5;226' grep --line-buffered --color=always -E  "^Step.*|$" "${@:1}" | sed -u 's/ && /\n     /g' ; }

PAD=$'\x1B[K'
SKY=$'\x1B[0;37;44m'
GRN=$'\x1B[0;30;42m'
TXT=$'\x1B[38;5;190m'
RST=$'\x1B[0m'
EOL=$'\n'

 build="docker build -t ${repository}:${context} -f ${containers}/${context}/Dockerfile ${containers}/${context}"
header="Container : ${repository}:${context} ${PAD}${EOL}   Command : ${build}"
logger="tee ${containers}/${context}/build.log"
 color="ack-grep --flush --passthru ^Step.*"

clear
echo -e "${EOL}${SKY}${TXT}${PAD}${EOL} ${header} ${PAD}${EOL}${PAD}${RST}${EOL}"

${build} | ${logger} | highlight

echo -e "${EOL}${SKY}${TXT}${PAD}${RST}${EOL}"
