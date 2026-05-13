import { describe, expect, it } from "vitest";
import QueryBuilder from "../../src/builders/query-builder";
import FilterQueryBuilder from "../../src/builders/filter-query-builder";
import { MediaType } from "../../src/types/media-type";

class TestBuilder extends FilterQueryBuilder(QueryBuilder) {}

describe("FilterQueryBuilder", () => {
    it("adds mediatype filter fragment to q", () => {
        const params = new URLSearchParams(new TestBuilder().withMediatype(MediaType.Audio).build());
        expect(params.get("q")).toBe("mediatype:audio");
    });

    it("adds collection filter fragment to q", () => {
        const params = new URLSearchParams(new TestBuilder().withCollection("etree").build());
        expect(params.get("q")).toBe("collection:etree");
    });

    it("quotes subject filter value", () => {
        const params = new URLSearchParams(new TestBuilder().withSubject("jazz piano").build());
        expect(params.get("q")).toContain(`subject:"jazz piano"`);
    });

    it("quotes creator filter value", () => {
        const params = new URLSearchParams(new TestBuilder().withCreator("Duke Ellington").build());
        expect(params.get("q")).toContain(`creator:"Duke Ellington"`);
    });

    it("produces date range in Solr bracket syntax", () => {
        const params = new URLSearchParams(new TestBuilder().withDateRange(2000, 2020).build());
        expect(params.get("q")).toContain("date:[2000 TO 2020]");
    });

    it("joins multiple filters with AND", () => {
        const params = new URLSearchParams(
            new TestBuilder()
                .withMediatype(MediaType.Audio)
                .withCollection("etree")
                .build()
        );
        expect(params.get("q")).toBe("mediatype:audio AND collection:etree");
    });

    it("combines query text and filter fragment", () => {
        const params = new URLSearchParams(
            new TestBuilder()
                .withQuery("jazz")
                .withMediatype(MediaType.Audio)
                .build()
        );
        expect(params.get("q")).toBe("jazz AND mediatype:audio");
    });

    it("adds language filter", () => {
        const params = new URLSearchParams(new TestBuilder().withLanguage("eng").build());
        expect(params.get("q")).toBe("language:eng");
    });
});
