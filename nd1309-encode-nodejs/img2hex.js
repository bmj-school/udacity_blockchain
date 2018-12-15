// Require file system access
fs = require('fs');
// console.log(fs);

// Read file buffer 
imgReadBuffer = fs.readFileSync('test-pattern.jpg', function(err,data) {
    if (err) throw err;
    console.log(data);
    
})
// Encode image buffer to hex
imgHexEncode = new Buffer(imgReadBuffer).toString('hex');
console.log('');

console.log(imgHexEncode.length + " characters, " + Buffer.byteLength(imgHexEncode, 'utf8') + " bytes");

// Output encoded data to console
// console.log(imgHexEncode);

// Decode hex
var imgHexDecode = new Buffer(imgHexEncode, 'hex');

// Save decoded file file system 
fs.writeFileSync('decodedHexImage.jpg', imgHexDecode);
