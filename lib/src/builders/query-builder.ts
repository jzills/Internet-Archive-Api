import { SortField, SortDirection } from "../types/sort-field";

export default class QueryBuilder {
    private readonly queryFragments: string[] = [];
    private readonly filterFragments: string[] = [];
    private readonly sorts: string[] = [];
    private rows: number = 50;
    private page: number = 1;

    withQuery(text: string): this {
        this.queryFragments.push(text);
        return this;
    }

    withRows(n: number): this {
        this.rows = Math.min(n, 10000);
        return this;
    }

    withPage(n: number): this {
        this.page = n;
        return this;
    }

    withSort(field: SortField, direction: SortDirection): this {
        this.sorts.push(`${field} ${direction}`);
        return this;
    }

    protected addFilterFragment(clause: string): this {
        this.filterFragments.push(clause);
        return this;
    }

    /** @internal */
    protected includeField(name: string): this {
        // overridden by FieldSelectionQueryBuilder mixin
        void name;
        return this;
    }

    build(): string {
        const parts = [
            ...this.queryFragments,
            ...this.filterFragments,
        ];

        const params = new URLSearchParams();
        if (parts.length > 0) {
            params.set("q", parts.join(" AND "));
        }
        params.set("rows", String(this.rows));
        params.set("page", String(this.page));
        params.set("output", "json");
        this.sorts.forEach(s => params.append("sort[]", s));
        return params.toString();
    }
}
