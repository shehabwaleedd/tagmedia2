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
SwiperCore.use([Navigation, Pagination]);

const OurTeam = () => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);


    const team = [
        {
            name: "Hesham Farok",
            position: "Social Media",
            image: "/assets/2.webp"
        },
        {
            name: "Moshira Kaem",
            position: "Social Media",
            image: "/assets/6.webp"
        },
        {
            name: "Farouq Yehia",
            position: "CEO & Founder",
            image: "/assets/2.webp"
        },
        {
            name: "Aliaa Hassan",
            position: "Senio Desginer",
            image: "/assets/6.webp"
        },
        {
            name: "Moshira Kaem",
            position: "Social Media",
            image: "/assets/6.webp"
        },
        {
            name: "Farouq Yehia",
            position: "CEO & Founder",
            image: "/assets/2.webp"
        },
        {
            name: "Aliaa Hassan",
            position: "Senio Desginer",
            image: "/assets/6.webp"
        },
    ]

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
                        slidesPerView: 2,
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
                {team.map((member, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.swiper__slide}>
                            <Image src={member.image} alt={member.name} width={400} height={400} />
                            <div className={styles.swiper__slide__container}>
                                <h3>{member.name}</h3>
                                <p>{member.position}</p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default OurTeam