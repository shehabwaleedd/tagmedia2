import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
export default async function WorkedWith() {
    const data = await serverDynamicFetch('workedWith');
    if (!data) {
        return null;
    }

    return (
        <section className={styles.integration}>
            <h2> Great Integration With Others </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis qui nesciunt autem voluptas molestiae at enim non! Ipsum voluptatem animi, hic ad quisquam, at cupiditate nihil laboriosam dolor sed repellat!
            </p>
            <div className={styles.integration__container}>
                {data && data.map((image: any, index: number) => {
                    return (
                        <Image key={index} src={image.image.url} alt="Integration" width={400} height={400} />
                    )
                })}
            </div>
        </section>
    )
}
