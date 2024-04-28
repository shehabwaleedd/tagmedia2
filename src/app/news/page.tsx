import React from 'react'
import { serverUseNews } from '@/lib/serverAllNews';
import Image from 'next/image'
import styles from "./page.module.scss"
import Link from 'next/link'
import { NewsType } from '@/types/common';
import NewsCards from './components/NewsCards';


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
            <NewsCards data={data} />
        </main>
    )
}
