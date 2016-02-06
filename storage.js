'use strict';

const fs = require('fs'),
  path = require('path'),
  sep = path.sep;

class Storage {
  constructor(basePath) {

    if (fs.accessSync(basePath, fs.W_OK) === false) {
      throw new Error(`${basePath} is not a valid path!`);
    }

    Object.defineProperties(this, {
      '_basePath': {
        configurable: false,
        enumerable: false,
        value: basePath,
        writable: true
      }
    })
  }

  hasItem(key) {
    return Object.keys(this.data).indexOf > -1;
  }

  getItem(key) {
    return this.data[key];
  }

  setItem(key, value) {
    this.data[key] = value;
    return this;
  }

  sync() {
    var data = JSON.stringify(this.data);
    fs.writeSync(`${this.basePath}${sep}storage.json`, data);
    return this;
  }
}
