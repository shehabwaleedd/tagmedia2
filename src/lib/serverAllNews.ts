

export async function serverUseNews() {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, { cache: "no-cache", });
        if (!res.ok) {
            console.error(`Failed to fetch tours, status: ${res.status}`);
            return
        }
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Error fetching tours:", error);
        return null;
    }
}
