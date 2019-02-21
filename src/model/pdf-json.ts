export class PdfJson {
  constructor(public formImage: FormImage) {}

  // {
  //     "formImage": {
  //       "Transcoder": "pdf2json@1.1.8 [https://github.com/modesty/pdf2json]",
  //       "Agency": "",
  //       "Id": { "AgencyId": "unknown", "Name": "unknown", "MC": false, "Max": -1, "Parent": -1 },
  //       "Pages": [
  //         {
  //           "Height": 49.5,
  //           "HLines": [],
  //           "VLines": [],
  //           "Fills": [{ "x": 0, "y": 0, "w": 0, "h": 0, "clr": 1 }],
  //           "Texts": [
  //             { "x": 4.252, "y": 4.404, "w": 6.878, "sw": 0.29428125, "clr": 0, "A": "left", "R": [{ "T": "H", "S": -1, "TS": [0, 14.04, 0, 0] }] },
  //             { "x": 4.679, "y": 4.404, "w": 18.889, "sw": 0.29428125, "clr": 0, "A": "left", "R": [{ "T": "ello%20", "S": -1, "TS": [0, 14.04, 0, 0] }] },
  //             { "x": 5.856, "y": 4.404, "w": 5.597, "sw": 0.29428125, "clr": 0, "A": "left", "R": [{ "T": "2", "S": -1, "TS": [0, 14.04, 0, 0] }] },
  //             { "x": 4.252, "y": 5.806, "w": 22.19, "sw": 0.29428125, "clr": 0, "A": "left", "R": [{ "T": "hello", "S": -1, "TS": [0, 14.04, 0, 0] }] }
  //           ],
  //           "Fields": [],
  //           "Boxsets": []
  //         }
  //       ],
  //       "Width": 38.25
  //     }
  //   }
}

export class FormImage {
  constructor(public Transcoder: string, public Agency: string, public Id: any) {}
}
export class Page {
  constructor(public Height: number, public Texts: Array<Text>) {}
}
export class Text {}
