var unirest = require('unirest');
var util = require('util');
var uuid = require('uuid');

var _console = console;

var options = {
  url: 'http://127.0.0.1:9001',
};

function sendLog(level, sublevel, args) {
  var data = {
    id: uuid.v1(),
    timestamp: new Date().toISOString(),
    level: level,
    sublevel: sublevel,
    message: util.format.apply(...args),
    args: args
  };
  _console.dir(data);

  unirest.post(options.url)
    .headers({'Content-Type': 'application/json'})
    .send(data)
    .end(
      _console.log.apply(...args)
    );
};

module.exports = exports = {
  log: function() {
    sendLog('console', 'INFO', arguments);
    _console.log.apply(...arguments)
  }
};


