// Use LDB to load all JSON values


let level = require('level');
// let chainDB = './chaindata';
let chainDB = './simplechaindata5';
let db = level(chainDB);

var readStream = db.createReadStream();
// console.log(readStream);

rs = readStream.on('data', function (data) {
  // each key/value is returned as a 'data' event
  let blockText = data.value
  let block_obj = JSON.parse(blockText)
  
  // console.log(data.key + ' = ' + blockText + ' height: ' + blockText.height, ', data: '+ blockText.data);
  console.log(data.key + ' = ' + block_obj + ' height: ' + block_obj.height, ', data: '+ block_obj.data);
  
});

console.log('Finished')
