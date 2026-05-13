export type SortField =
    | "downloads"
    | "avg_rating"
    | "publicdate"
    | "date"
    | "week"
    | "month"
    | "num_reviews"
    | "title"
    | "score";

export type SortDirection = "asc" | "desc";

export type SortOption = `${SortField} ${SortDirection}`;
