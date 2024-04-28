import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.scss'
import { NewsType } from '@/types/common'

const NewsCards = ({ data, title }: { data: NewsType[], title?: string }) => {
    const slugify = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')         // Remove all non-word chars
            .replace(/--+/g, '-')           // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }


    return (
        <section className={styles.news__content}>
            <>
                {title && <h1>{title}</h1>}
            </>
            {data.map((news: NewsType, index: number) => {
                return (
                    <div key={index} className={styles.news__content__card}>
                        <Image src={news.mainImg.url} alt="news" width={400} height={400} />
                        <div className={styles.column}>
                            <h2>{news.title}</h2>
                            <div className={styles.group}>
                                <p>{news.subTitle.replace(/<[^>]*>/g, '').slice(0, 150)}</p>
                                <Link href={`/news/${slugify(news.title)}`}><span>Read More</span></Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export default NewsCards