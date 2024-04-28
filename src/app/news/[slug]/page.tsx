''
import React from 'react';
import Image from 'next/image';
import { serverUseNewsByTitle } from '@/lib/news/serverUseNewsByTitle';
import styles from "./page.module.scss";
import Link from 'next/link';
import ImageSlider from '@/components/imageSlider/ImageSlider';
import UnifiedNewsComponent from '../components/unifiedNewsComponent';


export default async function NewsDetails({ params: { slug } }: { params: { slug: string } }) {

    const unslugify = (text: string) => {
        return text
            .replace(/-/g, ' ')
            .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());  // Capitalize the first letter of each word
    };

    const title = unslugify(slug);
    const newsDetails = await serverUseNewsByTitle(title);
    console.log(newsDetails, "news Details")


    return (
        <main className={styles.details}>
            <div>
                <Link href="/news">
                    Back to News
                </Link>
            </div>
            <section className={styles.details__upper}>
                <Image src="/assets/covers/news cover 2.webp" alt="news" width={1920} height={1080} />
            </section>
            <section className={styles.details__content}>
                {newsDetails?.images && <ImageSlider images={newsDetails.images} name='slider' />}
                <div className={styles.details__upper_content}>
                    <h1>{newsDetails?.title}</h1>
                    <div>
                        {newsDetails?.section && newsDetails?.section.map((section: any, index: number) => {
                            return (
                                <div key={index}>
                                    <h2>{section.title}</h2>
                                    <p>{section.subTitle}</p>
                                    <p>{section.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <UnifiedNewsComponent type='recommended' />
            <UnifiedNewsComponent type='like' />

        </main>
    );
}
