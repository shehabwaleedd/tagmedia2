import React from 'react'
import { serverUseNews } from '@/lib/serverAllNews';
import Image from 'next/image'
import styles from "./page.module.scss"
import Link from 'next/link'
import { NewsType } from '@/types/common';

export default async function News() {
    const data = await serverUseNews()
    return (
        <main className={styles.news}>
            <section className={styles.news__upper}>
                <Image src="/assets/covers/news cover 1.webp" alt="news" width={1920} height={1080} />
                <div className={styles.news__upper_content}>
                    <div>
                        <h1>Latest News</h1>
                    </div>
                    <div className={styles.divider}></div>
                </div>
            </section>
            <section className={styles.news__content}>
                {data.map((news: NewsType, index: number) => {
                    return (
                        <div key={index} className={styles.news__content__card}>
                            <Image src={news.mainImg.url} alt="news" width={400} height={400} />
                            <div className={styles.column}>
                                <h2>{news.title}</h2>
                                <div className={styles.group}>
                                    <p>{news.subTitle.replace(/<[^>]*>/g, '').slice(0, 150)}</p>
                                    <Link href={`/news/${news.title}`}><span>Read More</span></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </main>
    )
}
