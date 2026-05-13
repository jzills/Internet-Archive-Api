export type ItemFileSource = "original" | "derivative" | "metadata";

export type ItemFile = {
    name: string;
    source: ItemFileSource;
    format: string;
    mtime?: string;
    size?: string;
    md5?: string;
    crc32?: string;
    sha1?: string;
    length?: string;
    title?: string;
    artist?: string;
    track?: string;
    album?: string;
    bitrate?: string;
};
