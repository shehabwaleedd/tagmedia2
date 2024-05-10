import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import axios from 'axios';
import { toast } from "sonner";
import serverFetchServices from '@/lib/serverFetchServices';

export default async function ServicesPage() {
    const data = await serverFetchServices()
    const servicesData = data
    console.log(data, "services data")

    return (
        <main className={styles.landing} >
            <section className={styles.landing__container}>
                <Image src="/assets/covers/services.webp" alt="Landing" width={1080} height={1000} />
                <div className={styles.landing__container__content}>
                    <h1>Our Services</h1>
                    <div className={styles.landing__container__content_grid}>
                        {servicesData && servicesData.map((item: any, index: number) => (
                            <div key={index} className={styles.landing__container__content_grid_card}>
                                <Image src={item.image.url} width={50} height={50} alt={`${item.name}'s Icon`} />
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.landing__lower}>
                <div className={styles.landing__lower__content}>
                    <h2>Our Process</h2>
                    <p>We work according to an integrated business plan</p>
                </div>
                <Image src="/assets/process.png" alt="Process" width={1000} height={1000} />
            </section>
        </main>
    )
}