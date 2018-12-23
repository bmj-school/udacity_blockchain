const SHA256 = require('crypto-js/sha256');
let d = Date.now()
console.log(d);

thisNum = Math.random();
let thisAddress1 = SHA256(thisNum.toString()).toString();
console.log(`A1: ${thisAddress1}`);

thisNum = Math.random();
let thisAddress2 = SHA256(thisNum.toString()).toString();
console.log(`A2: ${thisAddress2}`);

// A simple object dictionary with address as key
let mempool = {}

mempool[thisAddress1] = 'request'

if (thisAddress1 in mempool){
    console.log('YES');
    
}