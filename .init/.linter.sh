#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-classic-147681-147690/tic_tac_toe_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

