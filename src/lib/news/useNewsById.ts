import { useState, useEffect } from "react";
import axios from "axios";
import { NewsType } from "@/types/common";
export const useNewsById = (id: string) => {
    const [news, setNews] = useState<NewsType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTour = async () => {
            setLoading(true);
            try {
                const response = await axios.get<NewsType>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`,
                );
                if (response.status === 200 && response.data) {
                    setNews(response.data);
                } else {
                    throw new Error("Failed to fetch event");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching event:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [id]); // Added id as a dependency to re-fetch when the id changes

    return { news, loading };
};
