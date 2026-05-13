export type SearchDoc = {
    identifier: string;
    title?: string;
    creator?: string | string[];
    subject?: string | string[];
    description?: string | string[];
    mediatype?: string;
    collection?: string | string[];
    date?: string;
    publicdate?: string;
    downloads?: number;
    avg_rating?: number;
    language?: string;
    num_reviews?: number;
    week?: number;
    month?: number;
};

export type SearchResponse = {
    responseHeader: {
        status: number;
        QTime: number;
        params: Record<string, string>;
    };
    response: {
        numFound: number;
        start: number;
        docs: SearchDoc[];
    };
};
