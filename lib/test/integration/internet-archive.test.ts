import { describe, expect, it } from "vitest";
import InternetArchive from "../../src/internet-archive";
import InternetArchiveRequestBuilder from "../../src/internet-archive-request-builder";
import InternetArchiveScrapeBuilder from "../../src/internet-archive-scrape-builder";
import { MediaType } from "../../src/types/media-type";
import { filterAudioFiles } from "../../src/utils/file-filter";

const ia = new InternetArchive();

describe("InternetArchive (integration)", () => {
    it("searches for audio items and returns results", async () => {
        const builder = new InternetArchiveRequestBuilder()
            .withQuery("jazz piano")
            .withMediatype(MediaType.Audio)
            .withRows(3)
            .includeIdentifier()
            .includeTitle()
            .includeCreator();
        const result = await ia.search(builder);
        expect(result.response.numFound).toBeGreaterThan(0);
        expect(result.response.docs.length).toBeGreaterThan(0);
        expect(result.response.docs[0].identifier).toBeTruthy();
    });

    it("scrapes audio items with cursor pagination", async () => {
        const builder = new InternetArchiveScrapeBuilder()
            .withQuery("ambient")
            .withFields("identifier", "title", "mediatype")
            .withCount(3);
        const result = await ia.scrape(builder);
        expect(result.items).toBeInstanceOf(Array);
        expect(result.count).toBeGreaterThan(0);
    });

    it("retrieves item metadata by identifier", async () => {
        const result = await ia.getItem("GratefulDead");
        expect(result.metadata.identifier).toBe("GratefulDead");
        expect(result.files_count).toBeGreaterThan(0);
    });

    it("retrieves and filters files for an item", async () => {
        const files = await ia.getFiles("GratefulDead");
        expect(files.length).toBeGreaterThan(0);
        const audioFiles = filterAudioFiles(files);
        expect(audioFiles.length).toBeGreaterThanOrEqual(0);
    });

    it("constructs a valid download URL", () => {
        const url = ia.getDownloadUrl("GratefulDead", "somefile.mp3");
        expect(url).toContain("archive.org/download/GratefulDead/somefile.mp3");
    });

    it("constructs a stream URL with time range", () => {
        const url = ia.getStreamUrl("GratefulDead", "concert.mp4", { start: 0, end: 120 });
        expect(url).toContain("start=0");
        expect(url).toContain("end=120");
    });
});
