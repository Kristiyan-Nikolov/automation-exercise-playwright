import { test as base, expect } from '@playwright/test';

//blocking 3rd party ads
export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route(
            /googleads\.g\.doubleclick\.net|pagead2\.googlesyndication\.com/,
            route => route.abort()
        );

        await use(page);
    },
});

export { expect };