#!/usr/bin/env bash
set -e

# get new tasks
(git remote -v | grep upstream | grep DimaAmega/web-fundamentals.git) && \
(git pull --ff-only upstream main && git push origin main) || true

pnpm install
