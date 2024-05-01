import React from 'react'
import styles from "./style.module.scss"
import { NewsType } from '@/types/common'
import { serverUseNewsQuery } from '@/lib/news/serverUseNewsQuery'
import NewsCards from '../NewsCards'

interface NewsProps {
    category?: string;
    type?: string; 
}



export default async function UnifiedNewsComponent({ category, type = 'recommended' }: NewsProps) {
    const query = category ? `category=${category}` : '';
    const news = await serverUseNewsQuery(query);

    const shuffleAndSliceTo3 = (array: NewsType[]) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, 3);
    }

    const newsArray = shuffleAndSliceTo3(await news);

    if (!news) {
        return null;
    }

    return (
        <section className={styles.recommendedTours}>
            <div className={styles.recommendedTours__container}>
                <NewsCards data={newsArray} title={`${type === 'recommended' ? 'Recommended News' : 'News You Might Like'}`} />
            </div>
        </section>
    )
}

