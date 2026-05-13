import { describe, expect, it } from "vitest";
import { vi } from "vitest";
import InternetArchive from "../../src/internet-archive";
import InternetArchiveRequestBuilder from "../../src/internet-archive-request-builder";
import InternetArchiveScrapeBuilder from "../../src/internet-archive-scrape-builder";
import { lastFetchUrl } from "./helpers";

const ia = new InternetArchive();

describe("InternetArchive.search", () => {
    it("calls advancedsearch.php with built query", async () => {
        const builder = new InternetArchiveRequestBuilder().withQuery("jazz").withRows(3);
        await ia.search(builder);
        expect(lastFetchUrl()).toContain("archive.org/advancedsearch.php");
        expect(lastFetchUrl()).toContain("q=jazz");
    });

    it("returns search response with docs array", async () => {
        const result = await ia.search(new InternetArchiveRequestBuilder().withQuery("test"));
        expect(result.response.docs).toBeInstanceOf(Array);
        expect(result.response.numFound).toBeTypeOf("number");
    });

    it("throws on error response", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            text: () => Promise.resolve("Bad request"),
        } as any);
        await expect(ia.search(new InternetArchiveRequestBuilder())).rejects.toThrow("Bad request");
    });
});

describe("InternetArchive.scrape", () => {
    it("calls scrape endpoint with built query", async () => {
        await ia.scrape(new InternetArchiveScrapeBuilder().withCount(5));
        expect(lastFetchUrl()).toContain("services/search/v1/scrape");
    });

    it("returns items array and cursor", async () => {
        const result = await ia.scrape(new InternetArchiveScrapeBuilder());
        expect(result.items).toBeInstanceOf(Array);
        expect(result.cursor).toBeTypeOf("string");
    });
});

describe("InternetArchive.getItem", () => {
    it("calls metadata endpoint with identifier", async () => {
        await ia.getItem("jazz-piano-collection-01");
        expect(lastFetchUrl()).toContain("/metadata/jazz-piano-collection-01");
        expect(lastFetchUrl()).not.toContain("/files");
    });

    it("returns item metadata with identifier", async () => {
        const result = await ia.getItem("jazz-piano-collection-01");
        expect(result.metadata.identifier).toBe("jazz-piano-collection-01");
    });
});

describe("InternetArchive.getFiles", () => {
    it("calls metadata/files endpoint", async () => {
        await ia.getFiles("jazz-piano-collection-01");
        expect(lastFetchUrl()).toContain("/metadata/jazz-piano-collection-01/files");
    });

    it("returns array of files", async () => {
        const result = await ia.getFiles("jazz-piano-collection-01");
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("format");
    });
});

describe("InternetArchive.getDownloadUrl", () => {
    it("constructs correct download URL", () => {
        const url = ia.getDownloadUrl("some-item", "track 01.mp3");
        expect(url).toBe("https://archive.org/download/some-item/track%2001.mp3");
    });

    it("does not call fetch", () => {
        ia.getDownloadUrl("item", "file.flac");
        expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });
});

describe("InternetArchive.getStreamUrl", () => {
    it("returns base URL when no options", () => {
        const url = ia.getStreamUrl("item", "video.mp4");
        expect(url).toBe("https://archive.org/download/item/video.mp4");
    });

    it("appends start and end when provided", () => {
        const url = ia.getStreamUrl("item", "video.mp4", { start: 30, end: 90 });
        expect(url).toContain("start=30");
        expect(url).toContain("end=90");
    });

    it("appends only start when end is omitted", () => {
        const url = ia.getStreamUrl("item", "video.mp4", { start: 15 });
        expect(url).toContain("start=15");
        expect(url).not.toContain("end=");
    });
});

describe("InternetArchive.download", () => {
    it("calls download URL and returns response", async () => {
        const response = await ia.download("item", "track.mp3");
        expect(lastFetchUrl()).toContain("/download/item/track.mp3");
        expect(response.ok).toBe(true);
    });
});
