import React from 'react'
import Image from 'next/image'
import styles from './style.module.scss'

export default function Landing() {
    return (
        <section className={styles.landing} >
            <div className={styles.landing__container}>
                <Image src="/assets/covers/home cover.webp" alt="Landing" width={1080} height={1000} />
                <div className={styles.landing__container__content}>
                    <h1>Welcome to the Tag</h1>
                    <div className={styles.divider}>

                    </div>
                    <p>Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.</p>
                    <div className={styles.btns}>
                        <a href="/services" className={styles.btn} style={{ backgroundColor: "var(--second-accent-color)", color: "var(--title-color)" }}>Getting Started Now</a>
                        <a href="/contact" className={styles.btn} style={{ border: "1px solid var(--background-color)" }}>Learn more</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
