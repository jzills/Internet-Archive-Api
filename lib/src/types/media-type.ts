export const MediaType = {
    Audio:      "audio",
    Movies:     "movies",
    Texts:      "texts",
    Software:   "software",
    Image:      "image",
    Data:       "data",
    Web:        "web",
    Collection: "collection",
    Etree:      "etree",
    Other:      "other",
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];
