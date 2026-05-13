import { afterAll, beforeAll, beforeEach, vi } from "vitest";
import searchFixture from "./fixtures/search-response.json";
import scrapeFixture from "./fixtures/scrape-response.json";
import itemMetadataFixture from "./fixtures/item-metadata.json";
import itemFilesFixture from "./fixtures/item-files.json";

beforeAll(() => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation((url: string) => {
        if (url.includes("/advancedsearch.php")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(searchFixture),
            });
        }
        if (url.includes("/services/search/v1/scrape")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(scrapeFixture),
            });
        }
        if (url.includes("/metadata/") && url.endsWith("/files")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(itemFilesFixture),
            });
        }
        if (url.includes("/metadata/")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(itemMetadataFixture),
            });
        }
        if (url.includes("/download/")) {
            return Promise.resolve({
                ok: true,
                headers: new Headers({ "content-type": "audio/mpeg" }),
                body: null,
            });
        }
        return Promise.resolve({
            ok: false,
            text: () => Promise.resolve("Not found"),
        });
    }));
});

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.unstubAllGlobals();
});
