import { describe, expect, it } from "vitest";
import InternetArchiveRequestBuilder from "../../src/internet-archive-request-builder";
import { MediaType } from "../../src/types/media-type";

describe("InternetArchiveRequestBuilder", () => {
    it("composes query text, filter fragment, and field selection", () => {
        const params = new URLSearchParams(
            new InternetArchiveRequestBuilder()
                .withQuery("jazz piano")
                .withMediatype(MediaType.Audio)
                .includeIdentifier()
                .includeTitle()
                .withRows(10)
                .build()
        );
        expect(params.get("q")).toBe("jazz piano AND mediatype:audio");
        expect(params.getAll("fl[]")).toContain("identifier");
        expect(params.getAll("fl[]")).toContain("title");
        expect(params.get("rows")).toBe("10");
        expect(params.get("output")).toBe("json");
    });

    it("supports chaining all three concern types in any order", () => {
        const params = new URLSearchParams(
            new InternetArchiveRequestBuilder()
                .includeCreator()
                .withCollection("etree")
                .withQuery("blues")
                .withSort("downloads", "desc")
                .includeDownloads()
                .withDateRange(1990, 2010)
                .build()
        );
        expect(params.get("q")).toBe("blues AND collection:etree AND date:[1990 TO 2010]");
        expect(params.getAll("fl[]")).toEqual(["creator", "downloads"]);
        expect(params.getAll("sort[]")).toEqual(["downloads desc"]);
    });
});
