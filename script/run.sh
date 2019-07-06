image=${1-pythia}
echo Running ${image}
docker run --rm -v ${1}:/final/wip -it w251-final/${image} bash