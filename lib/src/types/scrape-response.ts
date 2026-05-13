export type ScrapeDoc = {
    identifier: string;
    title?: string;
    creator?: string | string[];
    mediatype?: string;
    [key: string]: unknown;
};

export type ScrapeResponse = {
    items: ScrapeDoc[];
    count: number;
    cursor?: string;
    total?: number;
};
