/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

/* Modified the basic functions to return Promises */

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

exports.addLevelDBData = addLevelDBData;

// Add data to levelDB with key/value pair
// Return promise
// function addLevelDBData(key, value) {
//   return new Promise((resolve, reject) => {
//     db.put(key, value, (err) => {
//       if (err) {
//         console.log('ERROR');
//         reject(err)
//       } else {
//         console.log('Block {key} stored');
//         resolve(value)
//       }
//     })
//   }
// }


function addLevelDBData(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, (err) => {
      if (err) {
        console.log('Block ' + key + ' submission failed', err)
        reject(err)
      }
      else {
        console.log('Block #' + key + ' stored')
        resolve(value)
      }
    })
  })
}


addLevelDBData(0, 'test1').then(
  console.log('Finished')
)