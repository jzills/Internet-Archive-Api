import { Constructor } from "../types/constructor";
import { MediaType } from "../types/media-type";
import { IFilterQueryBuilder } from "./interfaces/filter-query-builder";
import QueryBuilder from "./query-builder";

export default function FilterQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<IFilterQueryBuilder> {
    return class extends Base {
        withMediatype(value: MediaType): this {
            return this.addFilterFragment(`mediatype:${value}`);
        }

        withCollection(name: string): this {
            return this.addFilterFragment(`collection:${name}`);
        }

        withSubject(keyword: string): this {
            return this.addFilterFragment(`subject:"${keyword}"`);
        }

        withCreator(name: string): this {
            return this.addFilterFragment(`creator:"${name}"`);
        }

        withTitle(text: string): this {
            return this.addFilterFragment(`title:"${text}"`);
        }

        withLanguage(code: string): this {
            return this.addFilterFragment(`language:${code}`);
        }

        withDateRange(from: number, to: number): this {
            return this.addFilterFragment(`date:[${from} TO ${to}]`);
        }
    };
}
