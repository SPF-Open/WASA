import { ZipReader, type Entry, TextWriter } from '@zip.js/zip.js';
import { XMLParser } from 'fast-xml-parser';

export const readZip = async (zipPath: FileList) => {
  if (!zipPath || !zipPath.length) throw new Error('No file available');

  const reader = new ZipReader(zipPath[0].stream());
  const entries = await reader.getEntries();

  return parseAssement(entries);
}

export const parseAssement = async (entries: Entry[]) => {
  const manifest = entries.find(entry => entry.filename.endsWith("test.xml"));
  if (!manifest) throw new Error("No manifest found");

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
  const writer = new TextWriter();
  const xml = await manifest.getData!(writer);

  let parsedXml = parser.parse(xml);

  const assessment = Assessment.parse(parsedXml.assessmentTest, manifest.filename.split('/')[1] as string);

  return assessment;
};

class Assessment {
  constructor(
    public id: string,
    public title: "",
    public parts: Part[] = [],
  ) { }
  static parse(obj: any, id: string) {
    if (!obj) throw new Error("No object to parse");
    const title = obj.title || "";
    return new Assessment(id, title, obj.testPart.map((part: any) => Part.parse(part)));
  }

  push(part: Part) {
    this.parts.push(part);
  }
}

class Part {
  constructor(
    public identifier: string,
    public title = "",
    public time = -1,
    public items: Item[] = [],
    public parts: Part[] = [],
  ) {
  }


  static parse(obj: any): Part {
    if (!obj) throw new Error("No object to parse");
    const identifier = obj.identifier || "";
    const title = obj.title || "";
    const time = obj.timeLimits && obj.timeLimits.maxTime ? obj.timeLimits.maxTime : -1;

    let next = [];
    let items = [];

    if (obj.assessmentSection && Object.keys(obj.assessmentSection).includes("0"))
      next = Object.keys(obj.assessmentSection).map((key: any) => obj.assessmentSection[key]);
    else if (obj.assessmentSection)
      next = [obj.assessmentSection];

    if (obj.assessmentItemRef && obj.assessmentItemRef.length)
      items = obj.assessmentItemRef.map((item: any) => Item.parse(item));

    return new Part(identifier, title, time, items, next.map((section: any) => Part.parse(section)));
  }

  push(item: Item) {
    this.items.push(item);
  }
}

class Item {
  constructor(
    public identifier: string,
    public id: string,
    public tools: Array<string> = [],
    public assets: Record<string, any>[] = [],
    public styles: Record<string, any>[] = [],
    public content = {},
  ) { }

  static parse(obj: any) {
    if (!obj) throw new Error("No object to parse");
    const identifier = obj.identifier || "";
    const id = obj.href ? obj.href.split("/")[3] : "";
    const tools = obj.category ? obj.category.split(" ") : {};
    return new Item(identifier, id, tools);
  }

  addContentFromXML(xml: string) {
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const parsedXml = parser.parse(xml);
    this.content = parsedXml;
  }
}

export const parseItem = async (entries: Entry[], assessment: Assessment) => {
  return {
    ...assessment, parts: await parsePart(assessment.parts, entries)
  }
}

const parsePart = async (part: Part[], entries: Entry[]): Promise<Part[]> => await Promise.all(part.map(async part =>
({
  ...part, parts: await parsePart(part.parts, entries), items: await Promise.all(part.items.map(async item => {
    const itemEntry = entries.find(entry => entry.filename.endsWith(`${item.id}/qti.xml`));
    if (!itemEntry) throw new Error("No item found");
    const writer = new TextWriter();
    const xml = await itemEntry.getData!(writer);
    item.addContentFromXML(xml);
    return item;
  }))
} as Part)
));

// class Content {
//   constructor(
//     public title: string,
//     public body: string,
//     public items: Array<Text | QOExtended | QCM>[],
//   ) { }
// }

// class Text {
//   constructor(
//     public body: string,
//     public child : Array<Text | QOShort> = [],
//   ) { }
// }


// class QOShort {
//   constructor(
//     public maxLenght : number = 0,
//     public hintLength : number = 0,
//   ) { }
// }

// class QOExtended extends QOShort {
//   constructor(
//     public title: string,
//     public txt : string,
//     public maxLenght : number = 0,
//     public hintLength : number = 0,
//   ) { super(maxLenght, hintLength) }

// }

// class QCM {
//   constructor(
//     public id: string,
//     public title: string,
//     public prompt : string,
//     public choices : Array<Choice>,
//   ) { }
// }

// class Choice {
//   constructor(
//     public id: string,
//     public promt: string,
//     public feedback: string,
//     public correct: boolean,
//     public score: number,
//   ) { }
// }