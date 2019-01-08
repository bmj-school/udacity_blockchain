//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
  });

  it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  });

  it('returns the name based on the token ID', async() => {
    let tokenId = 1;
    thisName = await instance.lookUptokenIdToStarInfo(tokenId)
    assert.equal(thisName, 'Awesome Star!')
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  });

  // Write Tests for:

// CRITERIA: 1) The token name and token symbol are added properly.
  it('has a name and symbol', async() => {
    assert.equal(await instance.name(), "Galaxy"); 
    assert.equal(await instance.symbol(), "GLXY"); 
  });

// CRITERIA: 2) 2 users can exchange their stars.
it('lets 2 users exchange star tokens', async() => {
  let user1 = accounts[1]
  let user2 = accounts[2]

  // Create the first star under user 1
  let starOneID = 100
  await instance.createStar('user1 star', starOneID, {from: user1})
  assert.equal(await instance.ownerOf(starOneID), user1)
  
  // Create the second star under user 2
  let starTwoID = 200
  await instance.createStar('user2 star', starTwoID, {from: user2})
  assert.equal(await instance.ownerOf(starTwoID), user2)

  // User 1 offers an exchange; star 100 for star 200
  let offerkey; 
  offerKey = await instance.offerExchange(starOneID, starTwoID, 0, 0, 0, {from: user1});
  
  // The offer exists
  assert.equal(await instance.offerExists(starOneID, starTwoID), true);
 
  // Make the swap
  await instance.exchangeStars(starOneID, starTwoID, {from: user2})

  // The offer is deleted
  assert.equal(await instance.offerExists(starOneID, starTwoID), false);

  // Check that they are swapped
  assert.equal(await instance.ownerOf(starOneID), user2)
  assert.equal(await instance.ownerOf(starTwoID), user1)
});

// CRITERIA: 3) Stars Tokens can be transferred from one address to another.
it('lets Tokens be transferred from one address to another', async function() {
  let user1 = accounts[1];
  let user2 = accounts[2];

  let starOneID = 999;

  // User 1 has a star
  await instance.createStar("user1 star", starOneID, {from: user1});
  assert.equal(await instance.ownerOf(starOneID), user1);

  // User 2 gets the star
  await instance.transferStar(user2, starOneID, {from: user1});
  assert.equal(await instance.ownerOf(starOneID), user2);
});