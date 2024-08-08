import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const Integration = ({ data }: { data: { image: { url: string }, name: string; link: string }[] }) => {

    return (
        <section className={styles.integration}>
            <h2> Great Integration With Others </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis qui nesciunt autem voluptas molestiae at enim non! Ipsum voluptatem animi, hic ad quisquam, at cupiditate nihil laboriosam dolor sed repellat!
            </p>
            <div className={styles.content}>
                {data.map((item: any, index: number) => {
                    return (
                        <Link key={index} href={item.link}>
                            <Image src={item.image.url} alt="Integration" width={400} height={400} priority={false} />
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Integration