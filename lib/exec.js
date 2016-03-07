'use strict';

const exec = require('child_process').exec;

module.exports = (command, options) => {
  let defaults = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200*1024,
    shell: '/bin/sh',
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
  };

  command = command + '';
  options = options || defaults;

  return new Promise((resolve, reject) => {
    if ('' === command) {
      reject(new Error('Invalid arguments'));
    }

    exec(command, options, (error, stdout, stderr) => {
      if (null !== error) {
        return reject(error, stdout, stderr);
      }
      return resolve(stdout, stderr);
    });
  });
};
