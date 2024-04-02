import React from 'react'
import Image from 'next/image'
import styles from './style.module.scss'
import * as contenful from "contentful";


interface Contentful {
    space: string;
    accessToken: string;
}

var client = contenful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
});

const url = `${process.env.BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/staging/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`

console.log(url)

export default function Landing() {
    return (
        <section className={styles.landing} >
            <div className={styles.landing__container}>
                <Image src="/assets/covers/home cover.webp" alt="Landing" width={500} height={500} />
                <div className={styles.landing__container__content}>
                    <Image src="/logo2.png" alt="Logo" width={100} height={100} />
                    <h1>Welcome to the Tag</h1>
                    <div className={styles.divider}>

                    </div>
                    <p>Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.</p>
                    <div className={styles.btns}>
                        <a href="/services" className={styles.btn} style={{backgroundColor: "var(--second-accent-color)", color: "var(--title-color)"}}>Getting Started Now</a>
                        <a href="/contact" className={styles.btn} style={{border: "1px solid var(--background-color)"}}>Learn more</a>
                    </div>
                </div>
            </div>
        </section>
    )
}



export async function getStaticProps() {
    const res = await client.getEntries({ content_type: 'landing' });
    const landing = res.items[0].fields;
    console.log(res)
    return {
        props: {
            landing
        }
    }
}