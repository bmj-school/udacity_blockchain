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
exports.getBlockByHash = getBlockByHash;
exports.getBlockByAddress = getBlockByAddress;

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

/**
 * Count the number of keys in the database.
 */
function getNumElements() {
  return new Promise(function (resolve, reject) {
    let num = 0;

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


// Get block by hash
function getBlockByHash(hash) {
  let block = null;
  return new Promise(function (resolve, reject) {
    db.createReadStream()
      .on('data', function (data) {
        thisHash = JSON.parse(data.value)['hash'];
        if (thisHash === hash) {
          block = data.value;
        }
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function () {
        resolve(block);
      });
  });
}


// Get block by address
// TODO: Generalize to get block by any parameter?
function getBlockByAddress(address) {
  let blocks = [];
  return new Promise(function (resolve, reject) {
    db.createReadStream()
      .on('data', function (data) {
        thisAddress = JSON.parse(data.value)['body']['address'];
        if (thisAddress === address) {
          let block = data.value;
          blocks.push(block)
        }
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function () {
        resolve(blocks);
      });
  });
}



// for (var i = 1; i < 11; i += 1) {
//   console.log(i);
// }

// Store 10 key value pairs
// for (var i = 1; i < 10; i++) {
//   console.log(`Adding ${i} ...`);
//   addLevelDBData(i, 'test ' + i).then(
//     // console.log('Finished ' + i)
//   )
// }



/*// PROMISE TESTING! 
// Query size of DB
let numElems = getNumElements().then(function (num) {
  console.log(`Number elements in DB: ${num}`);
});

// PROMISE TESTING : Get elem, using .then() .catch()
let getElem = getLevelDBData(11).then(function (elem) {
  console.log(`This elem: ${elem}`);
  return elem;
});

// PROMISE TESTING : async/await v1: Simple function def
async function getit() {
  result = await getLevelDBData(11);
  console.log(`YOUR RESULT ${result}`);
}
getit();


// async/await v2: Wrapped function, direct call, with error handling
(async () => {
  try {
    result = await getLevelDBData(11);
    console.log('async/await -> ', result);
  } catch (err) {
    console.log(err);
  }
})();

// async/await v3, WRAPPING INLINE
(async () => {
  result = await getLevelDBData(12);
  console.log('async/await 2 > ', result);
})();
*/ // PROMISE TESTING!





// Get by Hash
// (async () => {
//   result = await getLevelDBData(1);
//   console.log('GET BY HASH');
//   blockData = JSON.parse(result)
//   console.log(blockData);
//   console.log('HASH', blockData['hash']);
//   result = await getBlockByHash(blockData['hash'])
//   console.log('Block by hash: ' + result);
// })();




// // Get the 10 values back
// for (var i = 1; i < 10; i++) {
//   console.log(`Looking for ${i} ...`);
// }
// getLevelDBData(1)


// const makeRequest = async () => {
//   console.log(await getNumElements(1))
//   return "done"
// }



// const makeRequest = async () => {
// async thisCall() {
//   console.log(await getLevelDBData(1)())
// }




  // return "done"
// }
// makeRequest()
// getLevelDBData(10).then(function (value) {
//     thisHash = JSON.parse(value).hash;
//     console.log(`\t BLOCK HASH: ${thisHash}`)

//     // getBlockByHash(thisHash)

//   })
//   .catch(error) {
//   console.log(error);

// }
