import React from 'react'
import styles from "./page.module.scss"
import Image from 'next/image'
import OurTeam from '@/components/ourTeam'

const page = () => {
    return (
        <main className={styles.about}>
            <section className={styles.about__container}>
                <h1>About Tag Media</h1>
                <p>Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.</p>
            </section>
            <section className={styles.about__lower}>
                <div className={styles.about__lower__mission}>
                    <h2>Our Vision</h2>
                    <p>Our vision is to be the best in providing consistently successful, unique, and forward-thinking digital marketing solutions that take into account each client&apos;s individual requirements and demands, and to become a top agency offering digital marketing, and online brand management in the Middle east.</p>
                </div>
                <div className={styles.about__lower__mission}>
                    <h2>Our Mission</h2>
                    <p>Our mission is understanding customers&apos; needs through building long lasting strong relationships with them.</p>
                </div>
            </section>
            <section className={styles.about__story}>
                <div className={styles.about__story__container}>
                    <div className={styles.about__story__container_left}>
                        <Image src="/assets/covers/about photo.webp" alt="Cover" width={500} height={500} />
                    </div>
                    <div className={styles.about__story__container_right}>
                        <div className={styles.about__story__container_right_top}>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <span> | </span>
                                <h2>Our Story</h2>
                            </div>
                            <div className={styles.about__story__container_right_middle}>
                                <p>We began our work in Egypt in 2011 by managing the accounts of Egyptian public figures and celebrities, beginning with Hany Shaker, Jomana Murad. </p>
                                <p>Media production on the programme “Thoughts And Attitudes in the Life of Hani Shaker” beginning in 2020. As well as the creation of a collection of songs such as “Sha’abha Jaish”, “Momken ntaaraf” and “Zay Zaman”.</p>
                                <p>In addition, beginning in 2021, we collaborated  with Al-Sabah Art Production company in Egypt on e-marketing and content creation</p>
                            </div>
                        </div>
                        <div className={styles.about__story__container_right_lower}>
                            <a href="/contact">Start your work</a>
                        </div>
                    </div>
                </div>
                <OurTeam />
            </section>

        </main>
    )
}

export default page