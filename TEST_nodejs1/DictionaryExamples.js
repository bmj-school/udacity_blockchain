const SHA256 = require('crypto-js/sha256');

thisNum = Math.random();
let thisAddress1 = SHA256(thisNum.toString()).toString();
console.log(`A1: ${thisAddress1}`);

thisNum = Math.random();
let thisAddress2 = SHA256(thisNum.toString()).toString();
console.log(`A2: ${ thisAddress2 }`);

let mempool = {}

mempool[thisAddress1] = 'request'
