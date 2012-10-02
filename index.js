
var through = require('through')

var parser = exports =
module.exports =
function (listener) {
  var ready = true, soFar = '', length = 0, sep = ''
  return function (data) {
    if(data === false)
      return listener(soFar)
    soFar = soFar + data.toString()
    while(soFar.length) {
      //parse the length
      if(!length) {
        var m = /^(\d+)([^\d])/.exec(soFar)
        if (!m) 
          return //need more data
        length = Number(m[1])
        sep    = m[2]
        soFar = soFar.substring(m[0].length)
      }
      if(soFar.length < length)
        return //wait for more data
      
      var emit = soFar.substring(0, length)
      soFar = soFar.substring(length)
      length = 0
      listener(emit, sep)
    }
  }
}

exports.encode = function (sep) {
  sep = sep || '!'
  return through(function (data) {
    this.queue(data.length + sep + data)
  }, function () {
    this.queue(null)
  })
}

exports.decode = function () {
  var t, parse = parser(function (message) {
    t.queue(message)
  })
  return t = through(parse)
}

