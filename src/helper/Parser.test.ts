import { expect, test } from 'vitest'
import { parseAssement, parseItem } from './Parser'
import fs from "fs";
import { Blob } from "buffer";


import { ZipReader, Reader, BlobReader } from '@zip.js/zip.js';


test('Should read zip and get entries', async () => {
  // Read file from disk
  let buffer = fs.readFileSync("./bff23255_-_qcm_1r3_1710152366.zip");
  let blob = new Blob([buffer]) as globalThis.Blob;

  // Create a zip reader
  const zipFileReader = new BlobReader(blob);
  const zip = new ZipReader(zipFileReader);


  // Parse entries (magic happens here)
  const entries = await zip.getEntries();
  const tree = await parseAssement(entries);
  const itemTree = await parseItem(entries, tree);

  expect(tree).toBeDefined();
  expect(itemTree).toBeDefined();

  // Write tree to JSON file
  fs.writeFileSync("./out/tree.json", JSON.stringify(tree, null, 2));

  // Write itemTree to JSON file
  fs.writeFileSync("./out/tree2.json", JSON.stringify(itemTree, null, 2));

});


