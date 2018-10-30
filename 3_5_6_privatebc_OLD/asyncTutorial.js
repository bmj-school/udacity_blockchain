const fetch = require('node-fetch')

function fetchAvaterUrl(userId){
    return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
    .then(response => response.json())
    .then(data => data.imageUrl)
}

const result = fetchAvaterUrl(123)
console.log(result)
console.log('result ' + result);
console.log('Type is a: '+ result.constructor.name);

console.log('Type is a: ' + typeof result);

console.log(result)

result.then(function() {
    console.log(result);
})
