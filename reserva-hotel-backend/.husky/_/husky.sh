#!/bin/sh

if [ -f ~/.huskyrc ]; then
  . ~/.huskyrc
fi

export HUSKY=0

cd "$(git rev-parse --show-toplevel)" || exit 1

npm run lint
