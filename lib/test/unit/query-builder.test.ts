import { describe, expect, it } from "vitest";
import QueryBuilder from "../../src/builders/query-builder";

describe("QueryBuilder", () => {
    it("sets output=json", () => {
        const params = new URLSearchParams(new QueryBuilder().build());
        expect(params.get("output")).toBe("json");
    });

    it("defaults rows to 50 and page to 1", () => {
        const params = new URLSearchParams(new QueryBuilder().build());
        expect(params.get("rows")).toBe("50");
        expect(params.get("page")).toBe("1");
    });

    it("sets withQuery as q param", () => {
        const params = new URLSearchParams(new QueryBuilder().withQuery("jazz piano").build());
        expect(params.get("q")).toBe("jazz piano");
    });

    it("joins multiple withQuery calls with AND", () => {
        const params = new URLSearchParams(
            new QueryBuilder().withQuery("jazz").withQuery("piano").build()
        );
        expect(params.get("q")).toBe("jazz AND piano");
    });

    it("clamps rows to 10000", () => {
        const params = new URLSearchParams(new QueryBuilder().withRows(99999).build());
        expect(params.get("rows")).toBe("10000");
    });

    it("sets page", () => {
        const params = new URLSearchParams(new QueryBuilder().withPage(3).build());
        expect(params.get("page")).toBe("3");
    });

    it("appends sort[] as repeated params", () => {
        const params = new URLSearchParams(
            new QueryBuilder().withSort("downloads", "desc").withSort("date", "asc").build()
        );
        expect(params.getAll("sort[]")).toEqual(["downloads desc", "date asc"]);
    });

    it("produces no q param when no query or filters set", () => {
        const params = new URLSearchParams(new QueryBuilder().build());
        expect(params.get("q")).toBeNull();
    });
});
