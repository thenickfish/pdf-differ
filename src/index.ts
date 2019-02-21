import { readdir, stat, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { StringifyStream } from './stringify_stream';
import { PdfPair } from './pdf_pair';
import * as PDFParser from 'pdf2json';

let s = new PdfPair('hello', 'hello2');
console.log(s);

const dir: string = 'data';
readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }
  for (const file of files) {
    processFile(file);
  }
});

function processFile(file: string) {
  stat(join(dir, file), (err, stats) => {
    if (stats.isDirectory()) {
      return;
    }
    let inputStream = createReadStream(join(dir, file));
    let outputStream = createWriteStream(`./data/json/${file}.json`);
    inputStream
      .pipe(new PDFParser())
      .pipe(new StringifyStream())
      .pipe(outputStream);
  });
}
