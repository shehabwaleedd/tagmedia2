import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
const index = () => {
    const data = [
        "/assets/soundcloud.webp",
        "/assets/dailymotions.webp",
        "/assets/tiktok.webp",
    ]
    return (
        <section className={styles.integration}>
            <h2> Great Integration With Others </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis qui nesciunt autem voluptas molestiae at enim non! Ipsum voluptatem animi, hic ad quisquam, at cupiditate nihil laboriosam dolor sed repellat!
            </p>
            <div className={styles.integration__container}>
                {data.map((image, index) => {
                    return (
                        <Image key={index} src={image} alt="Integration" width={400} height={400} priority={false} />
                    )})}
            </div>
        </section>
    )
}

export default index