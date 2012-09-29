# message-stream

<img src=https://secure.travis-ci.org/'Dominic Tarr'/message-stream.png?branch=master>

A text stream where the edges of the chunks are perserved.

When reading to/from the disk or network,
the OS decides where to put the edges of the chunks.

``` js
var m = require('message-stream')
var encode = m.encode()


net.createStream(function (outstream) {

  outstream
    .pipe(m.decode())
    .on('data', function (mess) {
      console.log('>>', mess)
    })

}).listen(PORT)


encode
  .pipe(net.connect(PORT))

encode.write('hello world')
encode.write('delimited')
encode.write('messages')
```
Will always output the chunks with the edges where we put them.

``` 
>> hello world
>> delimited
>> messages
```

## License

MIT
