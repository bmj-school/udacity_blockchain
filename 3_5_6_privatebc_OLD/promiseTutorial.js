let promiseClean = new Promise(function (resolve, reject) {

    let coinFlip =  Math.random()<.5;

    if (coinFlip) {
        resolve('SUCCESS');
    } else {
        reject('FAIL');
    }
});


promiseClean.then(function (fromResolve) {
    console.log('Result is : ' + fromResolve);
}).catch(function (fromReject) {
    console.log('FAILURE : ' + fromReject);
    
    
})