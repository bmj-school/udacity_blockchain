// Delete

let level = require('level');
// let chainDB = './chaindata';
let chainDB = './simplechaindata5';
let db = level(chainDB);

var readStream = db.createReadStream();
// console.log(readStream);

rs = readStream.on('data', function (data) {
  console.log(data);
  console.log(data.value)
  console.log(typeof data.value);
  
});

console.log('Finished')
