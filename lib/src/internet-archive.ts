import QueryBuilder from "./builders/query-builder";
import InternetArchiveScrapeBuilder from "./internet-archive-scrape-builder";
import { ItemFile } from "./types/item-file";
import { ItemMetadata } from "./types/item-metadata";
import { ScrapeResponse } from "./types/scrape-response";
import { SearchResponse } from "./types/search-response";
import { StreamOptions } from "./types/stream-options";

export default class InternetArchive {
    readonly BASE_URL: string = "https://archive.org";

    search = async (builder: QueryBuilder): Promise<SearchResponse> => {
        const response = await fetch(`${this.BASE_URL}/advancedsearch.php?${builder.build()}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.text());
        }
    };

    scrape = async (builder: InternetArchiveScrapeBuilder): Promise<ScrapeResponse> => {
        const response = await fetch(`${this.BASE_URL}/services/search/v1/scrape?${builder.build()}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.text());
        }
    };

    getItem = async (identifier: string): Promise<ItemMetadata> => {
        const response = await fetch(`${this.BASE_URL}/metadata/${identifier}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.text());
        }
    };

    getFiles = async (identifier: string): Promise<ItemFile[]> => {
        const response = await fetch(`${this.BASE_URL}/metadata/${identifier}/files`);
        if (response.ok) {
            const data: { result: ItemFile[] } = await response.json();
            return data.result;
        } else {
            throw new Error(await response.text());
        }
    };

    getDownloadUrl = (identifier: string, filename: string): string => {
        return `${this.BASE_URL}/download/${identifier}/${encodeURIComponent(filename)}`;
    };

    download = async (identifier: string, filename: string): Promise<Response> => {
        const response = await fetch(this.getDownloadUrl(identifier, filename));
        if (response.ok) {
            return response;
        } else {
            throw new Error(await response.text());
        }
    };

    getStreamUrl = (identifier: string, filename: string, options?: StreamOptions): string => {
        const base = this.getDownloadUrl(identifier, filename);
        if (options === undefined || (options.start === undefined && options.end === undefined)) {
            return base;
        }
        const params = new URLSearchParams();
        if (options.start !== undefined) params.set("start", String(options.start));
        if (options.end !== undefined) params.set("end", String(options.end));
        return `${base}?${params.toString()}`;
    };
}
