# Syntax: ./build.sh
# Use --no-cache=true  when necessary
VERSION_TAG=$(<VERSION)
docker build -t hydra-healthbot-svcs:$VERSION_TAG .
