import { Assessment, parseAssement, parseItem } from "../helper/Parser";
import { ZipReader, type Entry } from "@zip.js/zip.js";
import { writable } from "svelte/store";

export const file = writable<any>(undefined);
export const assessment = writable<Assessment | undefined>(undefined);

file.subscribe(async (zipPath) => {
    if (!zipPath) return

    const reader = new ZipReader(zipPath.stream());
    const entries = await reader.getEntries();

    const assessmentParsed = await parseAssement(entries)
    const assessmentWithItem = await parseItem(entries, assessmentParsed);

    assessment.set(assessmentWithItem);
})

export const reset = () => {
    file.set(undefined);
    assessment.set(undefined);
}
