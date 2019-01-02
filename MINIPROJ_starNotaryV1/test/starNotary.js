import 'babel-polyfill';
import { AssertionError } from 'assert';

const StarNotary = artifacts.require('./starNotary.sol')

let instance;
let accounts;
var owner;

contract('StarNotary', async (accs) => {
    accounts = accs;
    owner = accounts[0];
    instance = await StarNotary.deployed();
})

it('has the correct name', async () => {
    assert.equal(await instance.starName.call(), 'Awesome Udacity Star');
})