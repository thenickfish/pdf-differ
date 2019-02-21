import { PdfPair } from './pdf-pair';
import { readFile, stat, createReadStream, createWriteStream, fstat, readFileSync } from 'fs';
import * as PDFParser from 'pdf2json';
import { StringifyStream } from './stringify-stream';
import { basename } from 'path';
import { diff } from 'deep-diff';

export class PdfComparer {
  data: any = {};

  compare(pdfPair: PdfPair) {
    console.log(pdfPair.originalFilename);
    console.log(pdfPair.revisedFilename);
    this.processFile2(pdfPair.originalFilename, pdfPair);
    this.processFile2(pdfPair.revisedFilename, pdfPair);
  }

  private processFile(filename: string): void {
    let inputStream = createReadStream(filename);
    let outputStream = createWriteStream(this.getJsonFilename(filename));
    inputStream
      .pipe(new PDFParser())
      .pipe(new StringifyStream())
      .pipe(outputStream);
  }

  private processFile2(filename: string, pdfPair: PdfPair): void {
    let pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      this.data[filename] = pdfData;
      if (Object.keys(this.data).length === 2) {
        this.getDiff(pdfPair);
      }
    });

    pdfParser.loadPDF(filename);
  }

  private getDiff(pdfPair: PdfPair) {
    console.log(this.data);
    const diffData = diff(this.data[pdfPair.originalFilename], this.data[pdfPair.revisedFilename]);
    // console.log(diffData);
    for (let diff of diffData) {
      if (diff.kind === 'A') {
        console.log('This was added...');
        console.log(diff.item.rhs);
      }
      if (diff.kind === 'E') {
        console.log('THis is an edit...');
        console.log('check the path: ' + diff.path.join('.') + ' the value went from ' + diff.lhs + ' to ' + diff.rhs);
        // console.log(diff);
      }
    }
  }

  getJsonFilename = (filename: string): string => `./data/json/${basename(filename)}.json`;
}
