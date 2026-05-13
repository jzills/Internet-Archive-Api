import { Constructor } from "../types/constructor";
import { IFieldSelectionQueryBuilder } from "./interfaces/field-selection-query-builder";
import QueryBuilder from "./query-builder";

export default function FieldSelectionQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<IFieldSelectionQueryBuilder> {
    return class extends Base {
        private readonly fields: string[] = [];

        protected includeField(name: string): this {
            this.fields.push(name);
            return this;
        }

        includeIdentifier(): this  { return this.includeField("identifier"); }
        includeTitle(): this       { return this.includeField("title"); }
        includeCreator(): this     { return this.includeField("creator"); }
        includeSubject(): this     { return this.includeField("subject"); }
        includeDescription(): this { return this.includeField("description"); }
        includeMediatype(): this   { return this.includeField("mediatype"); }
        includeCollection(): this  { return this.includeField("collection"); }
        includeDate(): this        { return this.includeField("date"); }
        includePublicdate(): this  { return this.includeField("publicdate"); }
        includeDownloads(): this   { return this.includeField("downloads"); }
        includeAvgRating(): this   { return this.includeField("avg_rating"); }
        includeLanguage(): this    { return this.includeField("language"); }
        includeNumReviews(): this  { return this.includeField("num_reviews"); }
        includeWeek(): this        { return this.includeField("week"); }
        includeMonth(): this       { return this.includeField("month"); }

        build(): string {
            const base = super.build();
            const params = new URLSearchParams(base);
            this.fields.forEach(f => params.append("fl[]", f));
            return params.toString();
        }
    };
}
