
let level = require('level');
let chainDB = './chaindata';
let db = level(chainDB);

db

let x = 5
x

db.put('testkey','testval')

db.get('testkey')

db.createReadStream()
    .on('d', function (d) {
        console.log(d.key, ' IS ', d.value);
    )}
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream ended')
  })