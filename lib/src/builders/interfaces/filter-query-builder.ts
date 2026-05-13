import { MediaType } from "../../types/media-type";

export interface IFilterQueryBuilder {
    withMediatype(value: MediaType): this;
    withCollection(name: string): this;
    withSubject(keyword: string): this;
    withCreator(name: string): this;
    withTitle(text: string): this;
    withLanguage(code: string): this;
    withDateRange(from: number, to: number): this;
}
