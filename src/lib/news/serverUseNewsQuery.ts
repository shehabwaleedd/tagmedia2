import { NewsType } from "@/types/common";

let cache: Record<string, NewsType[]> = {};
let cacheExpiry: number = Date.now() + 24 * 60 * 60 * 1000; // Set initial cache expiry to one day from now

export async function serverUseNewsQuery(query: string) {
    try {
        // Check cache expiry and clear cache if needed
        if (Date.now() > cacheExpiry) {
            console.log("Cache expired, clearing cache");
            cache = {};
        }
        // Return cached data if available
        if (cache[query]) {
            return cache[query];
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog?${query}`, { cache: "no-cache", });
        if (!res.ok) {
            throw new Error(`Failed to fetch tours, status: ${res.status}`);
        }
        const data = await res.json();
        // Update cache and set new expiry
        cache[query] = data.data;
        cacheExpiry = Date.now() + 24 * 60 * 60 * 1000;

        return data.data;
    } catch (error) {
        console.error("Error fetching news:", error);

        throw error;
    }
}
