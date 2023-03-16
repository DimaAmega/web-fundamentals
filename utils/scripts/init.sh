#!/bin/bash
set -e

exec_sudo () {
    if command -v sudo &> /dev/null
    then
        eval "sudo $1"
    else
        eval $1
    fi
}

PLATFORM=$(uname)
INIT_SCRIPT_URL="https://raw.githubusercontent.com/DimaAmega/web-fundamentals/main/utils/scripts/init.js"

if [[ "$PLATFORM" == 'Linux' ]]; then
    exec_sudo "apt update" && exec_sudo "apt upgrade -y"
    type -p curl >/dev/null || exec_sudo "apt install curl -y"
    type -p git >/dev/null ||  exec_sudo "apt install git -y"
fi

if ! command -v n &> /dev/null
then
    curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | exec_sudo "bash -s lts"
    exec_sudo "npm install -g n"
fi

while ! (curl -fsSL $INIT_SCRIPT_URL | node)
do
  echo "Try again"
  sleep 1
done
