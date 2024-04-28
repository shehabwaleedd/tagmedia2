import React from 'react'
import { serverUseNews } from '@/lib/serverAllNews';
import Image from 'next/image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./page.module.scss"
import Link from 'next/link'

export default async function News() {
    const data = await serverUseNews()
    return (
        <main className={styles.news}>
            <h1>Latest News</h1>
            <div className={styles.news_content}>
                
            </div>
        </main>
    )
}
