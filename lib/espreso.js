'use strict';

const Espreso = require('../espreso'),
  FEED = 'http://espreso.tv/rss';

module.exports = () => {
  let espreso = new Espreso(FEED);
  return espreso.watch();
};
