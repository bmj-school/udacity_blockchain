import 'babel-polyfill';

const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;
var owner;

contract('StarNotary', async (accs) => {
    accounts = accs;
    owner = accounts[0];
    instance = await StarNotary.deployed();
    console.log('HELLO TEST');

    StarNotary.deployed().then(function (instance) {
        return instance.starName.call();
        }).then(function (starName) { console.log('TESTING STAR NAME:' + starName);
    });

    instance.then(function (instance) {
        return instance.starName.call();
        }).then(function (starName) { console.log('TESTING STAR NAME 2:' + starName);
    });

})

it('has correct name', async () => {
    val = await instance.starName.call();
    console.log('HHHHHHHHHH');
    
    assert.equal(val, 'Awesome Udacity Star');
})



    // console.log('INSTANCE:');
    // console.log(instance);
    // console.log('instance.starName' + instance.starName);
    // console.log(await instance.starName.call()); 

// it('can be claimed', async () => {
//     await instance.claimStar({ from: owner });
//     assert.equal(await instance.starOwner.call(), owner)
// })

// it('can change owners', async () => {
//     var secondUser = accounts[1];
//     await instance.claimStar({ from: owner })
//     assert.equal(await instance.starOwner.call(), owner)
//     await instance.claimStar({ from: secondUser })
//     assert.equal(await instance.starOwner.call(), secondUser)
// })