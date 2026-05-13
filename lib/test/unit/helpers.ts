import { vi } from "vitest";

export function lastFetchUrl(): string {
    return vi.mocked(fetch).mock.calls.at(-1)![0] as string;
}

export function lastFetchParams(): URLSearchParams {
    const url = lastFetchUrl();
    return new URLSearchParams(url.split("?").pop()!);
}
