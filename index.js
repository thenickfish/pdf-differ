let fs = require('fs'),
  path = require('path'),
  nodeUtil = require('util'),
  stream = require('stream'),
  PDFParser = require('pdf2json');

var StringifyStream = function() {
  stream.Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
};
nodeUtil.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype._transform = function(obj, encoding, callback) {
  this.push(JSON.stringify(obj));
  callback();
};

const dir = 'data';
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    fs.stat(path.join(dir, file), (err, stats) => {
      if (stats.isDirectory()) {
        return;
      }
      if (!err) {
        let inputStream = fs.createReadStream(path.join(dir, file), { bufferSize: 64 * 1024 });
        let outputStream = fs.createWriteStream(`./data/json/${file}.json`);
        inputStream
          .pipe(new PDFParser())
          .pipe(new StringifyStream())
          .pipe(outputStream);
      } else {
        console.error(err);
      }
    });
  });
});
