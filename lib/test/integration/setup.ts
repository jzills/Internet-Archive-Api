import { beforeEach } from "vitest";

beforeEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
});
