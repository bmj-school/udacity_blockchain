const be = require('blockexplorer');

function getBlock(index) {
      //Add your code here
      msg = 'Iteration '
      console.log(msg + index)

      // Start by requesting the hash
      promise = be.blockIndex(index).then((hash) => {
            console.log(hash)
            console.log(typeof hash);
            let hashAux = JSON.parse(hash).blockHash;

            console.log(hashAux);
            
            
            // console.log(hash.blockHash)
            block_data = be.block(hashAux).then((block_data) => {
                  // console.log(block_data)

                  let bdAux = JSON.parse(block_data);
                        console.log('THIS BLOCK DATA:');
                        
                        console.log(bdAux);
                  

                  })



            })
            .catch((err) => {
            throw err
            })
      // console.log(promise)
      // console.log(res)
      // console.log("The hash:")
      // console.log(hash)
      // Then request the block and use console.log
      // block_data = be.block(hash)

      // console.log(block_data)
}

(function theLoop (i) {
    setTimeout(function () {
        getBlock(i);
        i++;
        if (i < 3) theLoop(i);
    }, 3600);
  })(0);