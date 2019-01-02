// import 'babel-polyfill';

const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;
var owner;

contract('StarNotary', async (accs) => {
    accounts = accs;
    owner = accounts[0];
    instance = await StarNotary.deployed();
    console.log('HELLO! THIS IS THE INSTANCE:');
    // console.log(instance);
    console.log('instance.starName' + instance.starName);
    // console.log(await instance.starName.call()); 
    
})

it('has correct name', async () => {
    console.log('HELLO, inside test.');
    assert.equal(await instance.starName.call(), 'Awesome Udacity Star');
})

it('can be claimed', async () => {
    await instance.claimStar({ from: owner });
    assert.equal(await instance.starOwner.call(), owner)
})

it('can change owners', async () => {
    var secondUser = accounts[1];
    await instance.claimStar({ from: owner })
    assert.equal(await instance.starOwner.call(), owner)
    await instance.claimStar({ from: secondUser })
    assert.equal(await instance.starOwner.call(), secondUser)
})