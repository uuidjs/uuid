#!/usr/bin/env bash
npm run pretest:browser && rsync -av --exclude=node_modules --delete-excluded examples/ broofa.com:broofa.com/tests/uuid_test
