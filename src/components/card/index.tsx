'use client'

import React from 'react'
import { NewsType } from '@/types/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"
import Link from 'next/link';

const NewsCard: React.FC<{ news: NewsType }> = ({ news }) => {

    const router = useRouter();
    const slugTitle = news.title.replace(/ /g, '-').toLowerCase();


    if (!news) {
        console.error("News data is missing.");
        return null;
    }



    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');



    const handleTourClick = (title: string) => {
        router.push(`/tours/${title}`);
    }



    return (
        <div className={styles.news__container_card} onClick={() => handleTourClick(slugTitle)}>
            <div className={styles.image}>
                <Image src={news.mainImg.url} alt={news.title} width={500} height={500} />

            </div>
            <div className={styles.bottom}>
                <h3>{news.title.slice(0, 50)}...</h3>
                <div className={styles.category}>
                    <p>{news.category}</p>
                </div>
                <p>{news.subTitle.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <div className={styles.btnDiv}>
                    <div className={styles.author}>
                        <Image src="/logo.webp" alt="Tag" width={20} height={20} />
                        <p>
                            Tag Media
                        </p>
                    </div>
                    <button onClick={() => handleTourClick(slugTitle)}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;