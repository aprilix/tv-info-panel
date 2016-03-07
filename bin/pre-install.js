#!/usr/bin/env node
'use strict';

const exec = require('../lib/exec');

function reject(error, stdout, stderr) {
  if (null !== error) {
    console.log(stdout, stderr);
    throw error;
  }
}

console.log('Running pre-install tasks...')
exec('git submodule update').then(() => {
  console.log('Update submodules...');

  exec('npm install', {
    cwd: `${__dirname}/../espreso/`
  }).then(() => {
    console.log('Pre-install complete!');
    process.exit(0);
  }, reject);

}, reject);
