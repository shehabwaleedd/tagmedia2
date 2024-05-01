'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper/core';
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import styles from './style.module.scss'
import Link from 'next/link';
import { Swiper as SwiperType } from 'swiper';
import Image from 'next/image'
import useDynamicFetchClient from '@/lib/useDynamicFetchClient';
SwiperCore.use([Navigation, Pagination]);


const OurTeam = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const { data, error } = useDynamicFetchClient('team');
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;
    const team = data;
    const setSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;
    };




    return (
        <section className={styles.team}>
            <div className={styles.team__upper}>
                <h2> Our Team </h2>
                <p> Meet the craziest team. Share your thoughts with them. </p>
            </div>
            <div className={styles.divider}></div>
            <Swiper
                slidesPerView={"auto"}
                modules={[Navigation]}
                onSwiper={setSwiper}
                breakpoints={{
                    380: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,

                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,

                    },
                    1888: {
                        slidesPerView: 5,
                        spaceBetween: 10,

                    }
                }}
                className={styles.swiper}
            >
                {team.map((member: any, index: number) => (
                    <SwiperSlide key={index} className={styles.swiper__slide}>
                        <div className={styles.swiper__slide__container}>
                            <Image src={member.image.url} alt={member.name} width={800} height={400} />
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default OurTeam