export async function serverDynamicFetch(query: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}`, { cache: "no-cache", });

        if (!res.ok) {
            console.error("Error fetching news:", res.statusText);
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching news:", error);

        throw error;
    }
}
