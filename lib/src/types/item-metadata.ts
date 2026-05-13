export type ItemMetadata = {
    created: number;
    d1: string;
    d2: string;
    dir: string;
    files_count: number;
    item_last_updated: number;
    item_size: number;
    metadata: {
        identifier: string;
        title?: string;
        creator?: string | string[];
        subject?: string | string[];
        description?: string | string[];
        mediatype?: string;
        collection?: string | string[];
        date?: string;
        language?: string;
        licenseurl?: string;
        [key: string]: unknown;
    };
    server: string;
    uniq: number;
    workable_servers: string[];
};
