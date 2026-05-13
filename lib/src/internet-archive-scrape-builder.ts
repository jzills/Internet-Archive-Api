import QueryBuilder from "./builders/query-builder";

export default class InternetArchiveScrapeBuilder extends QueryBuilder {
    private readonly fields: string[] = [];
    private count: number = 100;
    private cursor?: string;

    withFields(...names: string[]): this {
        this.fields.push(...names);
        return this;
    }

    withCount(n: number): this {
        this.count = n;
        return this;
    }

    withCursor(token: string): this {
        this.cursor = token;
        return this;
    }

    build(): string {
        const parts: string[] = [];

        const baseParams = new URLSearchParams(super.build());
        const q = baseParams.get("q");
        if (q) parts.push(`q=${encodeURIComponent(q)}`);
        if (this.fields.length > 0) parts.push(`fields=${encodeURIComponent(this.fields.join(","))}`);

        const sorts: string[] = [];
        baseParams.getAll("sort[]").forEach(s => sorts.push(s));
        if (sorts.length > 0) parts.push(`sorts=${encodeURIComponent(sorts.join(","))}`);

        parts.push(`count=${this.count}`);
        if (this.cursor !== undefined) parts.push(`cursor=${encodeURIComponent(this.cursor)}`);

        return parts.join("&");
    }
}
