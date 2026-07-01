# internet-archive-api

[![NPM Version](https://img.shields.io/npm/v/internet-archive-api)](https://www.npmjs.com/package/internet-archive-api) [![NPM Downloads](https://img.shields.io/npm/d18m/internet-archive-api)](https://www.npmjs.com/package/internet-archive-api)

A TypeScript NPM package for the [Internet Archive](https://archive.org) public API. Supports searching items, retrieving metadata and file listings, and constructing download/stream URLs.

## Features

- Fluent builder API (HOF mixin pattern) for constructing search queries
- Search via `advancedsearch.php` (page-based) or the scrape API (cursor-based, no 10k limit)
- Retrieve item metadata and file listings
- Construct download and stream URLs (with optional time-range for video)
- File filter utilities (`filterAudioFiles`, `filterFilesByFormat`, `filterOriginalFiles`)
- Dual ESM + CommonJS output
- No runtime dependencies — uses native `fetch`

## Installation

```bash
npm install internet-archive-api
```

## Usage

```typescript
import {
    InternetArchive,
    InternetArchiveRequestBuilder,
    MediaType,
    filterAudioFiles
} from "internet-archive-api";

const ia = new InternetArchive();

// Search for audio items
const builder = new InternetArchiveRequestBuilder()
    .withQuery("jazz piano")
    .withMediatype(MediaType.Audio)
    .withRows(25)
    .includeIdentifier()
    .includeTitle()
    .includeCreator()
    .includeDownloads()
    .withSort("downloads", "desc");

const results = await ia.search(builder);
console.log(results.response.docs);

// Get files for an item
const files = await ia.getFiles("some-identifier");
const audioFiles = filterAudioFiles(files);

// Get a download URL (sync, no fetch)
const url = ia.getDownloadUrl("some-identifier", "track.mp3");

// Get a stream URL with time range (for video)
const streamUrl = ia.getStreamUrl("some-identifier", "video.mp4", { start: 30, end: 90 });

// Download (returns raw Response — pipe body in Node.js proxy)
const response = await ia.download("some-identifier", "track.mp3");
```

### Cursor-based scraping (no 10k limit)

```typescript
import { InternetArchive, InternetArchiveScrapeBuilder } from "internet-archive-api";

const ia = new InternetArchive();
let cursor: string | undefined;

do {
    const builder = new InternetArchiveScrapeBuilder()
        .withQuery("ambient")
        .withFields("identifier", "title", "mediatype")
        .withCount(100);

    if (cursor) builder.withCursor(cursor);

    const result = await ia.scrape(builder);
    // process result.items ...
    cursor = result.cursor;
} while (cursor);
```

### Builder filters

| Method | Solr fragment |
|---|---|
| `.withMediatype(MediaType.Audio)` | `mediatype:audio` |
| `.withCollection("etree")` | `collection:etree` |
| `.withSubject("jazz")` | `subject:"jazz"` |
| `.withCreator("Miles Davis")` | `creator:"Miles Davis"` |
| `.withDateRange(1960, 1980)` | `date:[1960 TO 1980]` |
| `.withLanguage("eng")` | `language:eng` |

## Development

```bash
cd lib
npm install
npm run build       # compile to dist/
npm test            # unit tests (vitest)
npm run test:integration  # integration tests against live archive.org
```
