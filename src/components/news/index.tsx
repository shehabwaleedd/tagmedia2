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
import Image from 'next/image';
SwiperCore.use([Navigation, Pagination]);
const NewsHomePage = () => {
    const data = [
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
        {
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nobis quod laboriosam ab fugiat molestias impedit quidem, incidunt tempore consequuntur. Eius, quod.",
            description: "Tag-Media is one of the marketing and creative consultancy agencies in Egypt and the Middle east. We are working closely with our partners to manage their publicity and social media presence.We build awareness campaigns for our clients that would drive more tra c and engagement.",
            image: "/assets/news.webp"
        },
    ]
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className={styles.newsHomePage}>
            <h2>Our News</h2>
            <Swiper
                onSwiper={setSwiper}
                navigation={true}
                slidesPerView={"auto"}
                spaceBetween={30}
                modules={[Navigation]}
                breakpoints={{
                    440: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1888: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    }
                }}
                className={styles.swiper}
            >
                {data.map((news, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.swiper__slide}>
                            <Image src={news.image} alt={news.title} width={400} height={400} />
                            <div className={styles.swiper__slide__container}>
                                <h3>{news.title.slice(0, 35)}</h3>
                                <p>{news.description}</p>
                                <button>
                                    <Link href="/">
                                        Read More
                                    </Link>
                                </button>
                            </div>
                        </SwiperSlide>
                    )
                })}
                <div ref={prevRef} className={styles.swiper__prev}></div>
                <div ref={nextRef} className={styles.swiper__next}></div>
            </Swiper>
        </section>
    )
}

export default NewsHomePage