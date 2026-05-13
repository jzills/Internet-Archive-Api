import { ItemFile } from "../types/item-file";

export function filterFilesByFormat(files: ItemFile[], formats: string | string[]): ItemFile[] {
    const targets = Array.isArray(formats) ? formats : [formats];
    const normalized = targets.map(f => f.toLowerCase());
    return files.filter(f => normalized.includes(f.format.toLowerCase()));
}

export function filterOriginalFiles(files: ItemFile[]): ItemFile[] {
    return files.filter(f => f.source === "original");
}

export function filterAudioFiles(files: ItemFile[]): ItemFile[] {
    const audioFormats = [
        "mp3", "vbr mp3", "flac", "24bit flac", "ogg vorbis",
        "128kbps mp3", "64kbps mp3", "160kbps mp3", "aiff", "wav",
    ];
    return files.filter(f => audioFormats.includes(f.format.toLowerCase()));
}
