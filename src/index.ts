import { readdir, stat, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { StringifyStream } from './stringify-stream';
import { PdfPair } from './pdf-pair';
import * as PDFParser from 'pdf2json';
import { PdfComparer } from './pdf-comparer';

let pdfPair = new PdfPair('data/a.pdf', 'data/b.pdf');
let comparer = new PdfComparer();
comparer.compare(pdfPair);

// const dir: string = 'data';
// readdir(dir, (err, files) => {
//   if (err) {
//     throw err;
//   }
//   for (const file of files) {
//     processFile(file);
//   }
// });

// function processFile(file: string) {
//   stat(join(dir, file), (err, stats) => {
//     if (stats.isDirectory()) {
//       return;
//     }
//     let inputStream = createReadStream(join(dir, file));
//     let outputStream = createWriteStream(`./data/json/${file}.json`);
//     inputStream
//       .pipe(new PDFParser())
//       .pipe(new StringifyStream())
//       .pipe(outputStream);
//   });
// }
