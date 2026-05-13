import { describe, expect, it } from "vitest";
import { filterAudioFiles, filterFilesByFormat, filterOriginalFiles } from "../../src/utils/file-filter";
import type { ItemFile } from "../../src/types/item-file";
import itemFilesFixture from "./fixtures/item-files.json";

const files = itemFilesFixture.result as ItemFile[];

describe("filterFilesByFormat", () => {
    it("filters by single format (case-insensitive)", () => {
        const result = filterFilesByFormat(files, "VBR MP3");
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("track01.mp3");
    });

    it("filters by multiple formats", () => {
        const result = filterFilesByFormat(files, ["VBR MP3", "FLAC"]);
        expect(result).toHaveLength(2);
    });

    it("is case-insensitive", () => {
        const result = filterFilesByFormat(files, "vbr mp3");
        expect(result).toHaveLength(1);
    });

    it("returns empty array when no match", () => {
        const result = filterFilesByFormat(files, "OGG Vorbis");
        expect(result).toHaveLength(0);
    });
});

describe("filterOriginalFiles", () => {
    it("returns only original source files", () => {
        const result = filterOriginalFiles(files);
        expect(result.every(f => f.source === "original")).toBe(true);
    });

    it("excludes derivative and metadata files", () => {
        const result = filterOriginalFiles(files);
        const names = result.map(f => f.name);
        expect(names).not.toContain("jazz-piano-collection-01_meta.xml");
        expect(names).not.toContain("track02.mp3");
    });
});

describe("filterAudioFiles", () => {
    it("returns audio files only", () => {
        const result = filterAudioFiles(files);
        expect(result.every(f => f.format.toLowerCase() !== "jpeg")).toBe(true);
        expect(result.every(f => f.format.toLowerCase() !== "metadata")).toBe(true);
    });

    it("includes VBR MP3, FLAC, and 128Kbps MP3", () => {
        const result = filterAudioFiles(files);
        const formats = result.map(f => f.format);
        expect(formats).toContain("VBR MP3");
        expect(formats).toContain("FLAC");
        expect(formats).toContain("128Kbps MP3");
    });
});
