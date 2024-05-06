''
import React from 'react';
import Image from 'next/image';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import styles from "./page.module.scss";
import Link from 'next/link';
import ImageSlider from '@/components/imageSlider/ImageSlider';
import UnifiedNewsComponent from '../components/unifiedNewsComponent';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const query = `blog/${decodeURIComponent(params.slug)}`;
    const newsDetails = await serverDynamicFetch(query);
    if (!newsDetails) {
        return null;
    }

    const title = newsDetails?.seoTitle
    const description = newsDetails?.seoDescription
    const images = newsDetails?.seoImage.url || "/assets/covers/news cover 2.webp"
    const keywords = newsDetails?.seoKeywords
    const url = `https://tagmedia.me/news/${params.slug}`

    return {
        title,
        description,
        images,
        keywords,
        url,
        type: "article",
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images,
        },
        twitter: {
            title,
            description,
            images,
            url,
        }
    }

}


export default async function NewsDetails({ params }: { params: { slug: string } }) {
    const query = `blog/${decodeURIComponent(params.slug)}`;
    const newsDetails = await serverDynamicFetch(query);
    console.log(newsDetails, "data", query, "qiuery")
    if (!newsDetails) {
        return null;
    }

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
                    <title>{newsDetails?.title}</title>
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
