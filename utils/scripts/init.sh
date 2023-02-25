#!/bin/bash
set -e

PLATFORM=$(uname)
INIT_SCRIPT_URL="https://raw.githubusercontent.com/DimaAmega/web-fundamentals/main/utils/scripts/init.js"
INIT_SCRIPT_NAME=tini.js

if [[ "$PLATFORM" == 'Linux' ]]; then
    (apt update && apt upgrade -y) || (sudo apt update && sudo apt upgrade -y) || true
    type -p curl >/dev/null || apt install curl -y || sudo apt install curl -y
    type -p git >/dev/null || apt install git -y || sudo apt install git -y
fi

if ! command -v n &> /dev/null
then
    curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s lts
    (npm install -g n) || (sudo npm install -g n)
fi

curl $INIT_SCRIPT_URL > $INIT_SCRIPT_NAME
node $INIT_SCRIPT_NAME
rm -rf $INIT_SCRIPT_NAME
