'use client'
import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import useDynamicFetchClient, { DataType } from '@/lib/useDynamicFetchClient';
import Slider from '../swiper';


const OurTeam = () => {
    const { data, error } = useDynamicFetchClient('team');
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;
    const team = data;

    return (

        <section className={styles.team}>
            <div className={styles.team__upper}>
                <h2> Our Team </h2>
                <p> Meet the craziest team. Share your thoughts with them. </p>
            </div>
            <div className={styles.divider}></div>
            <Slider content={content(team)} />
        </section>
    )
}

export default OurTeam


const content = (team: DataType[]) => {

    return (
        <>
                {team.map((member, index) => (
                    <div key={index} className={`keen-slider__slide`}>
                            <div className={styles.swiper__slide__container}>
                            <Image src={member.image.url} alt={member.name} width={800} height={400} />
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                    </div>
                ))}
        </>
    )

}