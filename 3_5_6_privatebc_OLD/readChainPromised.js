let level = require('level');
let chainDB = './simplechaindata2';
let db = level(chainDB);

var readStream = db.createReadStream();
function getAllBlocks() {
  return new Promise(function (resolve, reject) {
    readStream.on('data', function (data) {
      let blockText = data.value
      let block_obj = JSON.parse(blockText)
      // resolve(data)
      resolve(block_obj)
    });

  });
}

getAllBlocks().then(function (data) {
  console.log(data);
});