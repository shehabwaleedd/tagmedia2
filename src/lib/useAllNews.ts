import { useState, useEffect } from "react";
import axios from "axios";
import { NewsType } from "@/types/common";

export const useAllNews = (page: number) => {
    const [news, setNews] = useState<NewsType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog?page=${page}`);
            if (response.status === 200 && response.data) {
                setNews(response.data.data.result);
            } else {
                throw new Error("Failed to fetch event");
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchNews();
    }, [page]);

    return { news, loading, setNews };
};
