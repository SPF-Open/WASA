import { expect, test } from 'vitest'
import { parse } from './Parser'
import fs from "fs";
import { Blob } from "buffer";


import { ZipReader, Reader, BlobReader } from '@zip.js/zip.js';


test('Should read zip and get entries', async () => {
  // Read file from disk
  let buffer = fs.readFileSync("./bfg22241_-_qcm_1675866027.zip");
  let blob = new Blob([buffer]) as globalThis.Blob;

  // Create a zip reader
  const zipFileReader = new BlobReader(blob);
  const zip = new ZipReader(zipFileReader);


  // Parse entries (magic happens here)
  const entries = await zip.getEntries();
  const tree = await parse(entries);

  expect(tree).toBeDefined();
  console.log(tree);
});


