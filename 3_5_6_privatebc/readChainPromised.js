// Use LDB to load all JSON values


let level = require('level');
let chainDB = './chaindata';
// let chainDB = './simplechaindata5';
let db = level(chainDB);

var readStream = db.createReadStream();
// console.log(readStream);

rs = readStream.on('data', function (data) {
  // each key/value is returned as a 'data' event
  console.log(data);
});

console.log('Finished')
