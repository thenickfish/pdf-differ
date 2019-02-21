import { Transform } from 'stream';

export class StringifyStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }
  _transform(obj: any, encoding: string, callback: Function) {
    console.log(obj);
    this.push(JSON.stringify(obj));
    callback();
  }
}
