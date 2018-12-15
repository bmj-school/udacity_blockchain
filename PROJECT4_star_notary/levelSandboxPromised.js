/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

/* Modified the basic functions to return Promises */

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

exports.addLevelDBData = addLevelDBData;
exports.getLevelDBData = getLevelDBData;
exports.getNumElements = getNumElements;

// Add data to levelDB with key/value pair PROMISED
function addLevelDBData(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, function (err) {
      if (err) {
        console.log(`Error key:value [${key}:${value}]`, err)
        reject(err)
      }
      else {
        // console.log(`|Promise resolved| Adding key:value [${key}:${value}]`)
        resolve(value)
      }
    })
  })
}


// Get data from levelDB with key PROMISED
function getLevelDBData(key) {
  return new Promise((resolve, reject) => {
    db.get(key, function (err, value) {
      if (err) {
        reject(err)
      } else {
        //console.log(`|Promise resolved| Retrieving key:${key}`);
        resolve(value)
      }
    })
  })
}


function getNumElements() {
  return new Promise(function (resolve, reject) {
    let num = 0

    db.createReadStream().on('data', (data) => {
      num++
    }).on('error', (error) => {
      reject(error)
    }).on('close', () => {
      // console.log(`|Promise resolved| Number elements:${num}`);
      resolve(num)
    })
  })
}


/* FOR TESTING

// for (var i = 1; i < 11; i += 1) {
//   console.log(i);
// }

// Store 10 key value pairs
for (var i = 1; i < 10; i++) {
  console.log(`Adding ${i} ...`);
  addLevelDBData(i, 'test ' + i).then(
    // console.log('Finished ' + i)
  )
}

// Query size of DB
getNumElements().then(function (num) {
  console.log(`Number elements in DB: ${num}`);
})

// Get the 10 values back
for (var i = 1; i < 10; i++) {
  console.log(`Looking for ${i} ...`);
  getLevelDBData(i).then(function (value){
    console.log(`\t${value}`)
  })
}


*/