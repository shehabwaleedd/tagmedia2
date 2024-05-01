import React from 'react'
import styles from './style.module.scss'
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';



export default async function Announcment() {
    const defaultPartners = await serverDynamicFetch('partner');

    if (!defaultPartners) {
        return null;
    }

    return (
        <div className={styles.marquee}>
            <h2>Our Partners</h2>
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
                <div className={styles.marquee_content}>
                    <div className={styles.marquee_partners}>
                        {defaultPartners && defaultPartners.map((partner: any, index: number) => (
                            <div key={index} className={styles.marquee_partner}>
                                <Image src={partner.image.url} alt={partner.name} width={600} height={600} title={partner.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Marquee>
        </div>
    )
}

