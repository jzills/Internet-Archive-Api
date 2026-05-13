import { describe, expect, it } from "vitest";
import QueryBuilder from "../../src/builders/query-builder";
import FieldSelectionQueryBuilder from "../../src/builders/field-selection-query-builder";

class TestBuilder extends FieldSelectionQueryBuilder(QueryBuilder) {}

describe("FieldSelectionQueryBuilder", () => {
    it("appends fl[] for each included field", () => {
        const params = new URLSearchParams(
            new TestBuilder().includeIdentifier().includeTitle().build()
        );
        expect(params.getAll("fl[]")).toEqual(["identifier", "title"]);
    });

    it("produces no fl[] when no fields selected", () => {
        const params = new URLSearchParams(new TestBuilder().build());
        expect(params.getAll("fl[]")).toEqual([]);
    });

    it("supports all 15 field methods", () => {
        const builder = new TestBuilder()
            .includeIdentifier()
            .includeTitle()
            .includeCreator()
            .includeSubject()
            .includeDescription()
            .includeMediatype()
            .includeCollection()
            .includeDate()
            .includePublicdate()
            .includeDownloads()
            .includeAvgRating()
            .includeLanguage()
            .includeNumReviews()
            .includeWeek()
            .includeMonth();
        const params = new URLSearchParams(builder.build());
        expect(params.getAll("fl[]")).toHaveLength(15);
    });

    it("fl[] does not bleed into base q param", () => {
        const params = new URLSearchParams(
            new TestBuilder().withQuery("test").includeTitle().build()
        );
        expect(params.get("q")).toBe("test");
        expect(params.getAll("fl[]")).toEqual(["title"]);
    });
});
