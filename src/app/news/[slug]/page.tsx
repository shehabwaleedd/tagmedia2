''
import React from 'react';
import Image from 'next/image';
import { useNewsPage } from '@/lib/useNewsPage';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./page.module.scss";
import Link from 'next/link';


export default async function NewsDetails({ params: { slug } }: { params: { slug: string } }) {
    const data = await useNewsPage();
    const news = data.items ? data.items.find((item: any) => item.fields.slug === slug) : null;

    if (!news) {
        return (
            <main className={styles.details}>
                <h1>News Not Found</h1>
            </main>
        );
    }
    const featuredImage = news.fields.featuredImage ? data.includes.Asset.find((asset: any) => asset.sys.id === news.fields.featuredImage.sys.id) : null;
    const authorImage = news.fields.author ? data.includes.Asset.find((asset: any) => asset.sys.id === news.fields.author.sys.id) : null;

    return (
        <main className={styles.details}>
            <div>
                <Link href="/news">
                    Back to News
                </Link>

            </div>
            {featuredImage && (
                <div className={styles.featuredImage}>
                    <Image
                        src={`https:${featuredImage.fields.file.url}`}
                        alt={news.fields.title}
                        width={1300}
                        height={1000}
                    />
                </div>
            )}
            <div className={styles.group}>
                <h1>{news.fields.title}</h1>
                <p>Created at: {news.sys.createdAt.substring(0, 10)}</p>
            </div>
            <div className={styles.metadata}>
                {authorImage && (
                    <div className={styles.author}>
                        <Image
                            src={`https:${authorImage.fields.file.url}`}
                            alt={news.fields.author.fields.name}
                            width={50}
                            height={50}
                            layout='fixed'
                        />
                        <p>{news.fields.author.fields.name}</p>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                {documentToReactComponents(news.fields.content)}
            </div>
            {/* <ShareSocial
                style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}
                url={window.location.href}
                socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
            /> */}
        </main>
    );
}
