'use client'

import React from 'react'
import { NewsType } from '@/types/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"
import Link from 'next/link';

const NewsCard: React.FC<{ news: NewsType }> = ({ news }) => {

    const router = useRouter();


    if (!news) {
        console.error("News data is missing.");
        return null;
    }



    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');



    const handleTourClick = (slug: string) => {
        router.push(`/news/${slug}`);
    }



    return (
        <div className={styles.news__container_card} onClick={() => handleTourClick(news?.slug)}>
            <div className={styles.image}>
                <Image src={news?.mainImg?.url} alt={news.title} width={500} height={250} sizes="(min-width: 1040px) calc(30vw - 35px), (min-width: 780px) 41.25vw, 90vw" />

            </div>
            <div className={styles.bottom}>
                <h3>{news?.title?.slice(0, 50)}...</h3>
                <div className={styles.category}>
                    <p>{news?.category}</p>
                </div>
                <p>{news?.subTitle?.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <div className={styles.btnDiv}>
                    <div className={styles.author}>
                        <Image src="/logo.webp" alt="Tag" width={20} height={20} />
                        <p>
                            Tag Media
                        </p>
                    </div>
                    <button onClick={() => handleTourClick(news?.slug)}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;