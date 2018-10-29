let level = require('level');
let chainDB = './simplechaindata2';
let db = level(chainDB);

var readStream = db.createReadStream();
function getAllBlocks() {
  return new Promise((resolve, reject) => {
    let blocks = []
    readStream.on('data', function (data) {
      let blockText = data.value
      let block_obj = JSON.parse(blockText)
      blocks.push(block_obj)
    }).on('end', () => resolve(blocks))
  })
}

getAllBlocks().then(function (data) {
  console.log(data);
  console.log('Finished');
});

