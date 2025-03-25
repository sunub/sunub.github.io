import { LRUCache } from "lru-cache";
export const LRUCacheInstance = new LRUCache({
    maxSize: 40 * 1024 * 1024,
    ttl: 1000 * 60 * 30,
    updateAgeOnGet: true,
    sizeCalculation: (value) => {
        if (typeof value === "string") {
            return value.length;
        }
        return new TextEncoder().encode(JSON.stringify(value)).length;
    },
});
//# sourceMappingURL=cache.js.map