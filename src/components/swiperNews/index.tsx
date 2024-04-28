'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper/core';
import { Navigation, Pagination } from "swiper/modules";
import styles from "@/components/news/style.module.scss"
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Swiper as SwiperType } from 'swiper';
import { NewsType } from '@/types/common';
import NewsCard from '../card';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

SwiperCore.use([Navigation, Pagination]);

const SwiperNews = (
    { news }: { news: NewsType[] }
) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);


    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };


    return (
        <div>
            <div className={styles.newsHomePage__upper}>
                <h2>Our News</h2>
                <div className={styles.newsHomePage_btns}>
                    <button ref={prevRef} onClick={handlePrevSlide} aria-label="Previous slide"><GoArrowLeft /></button>
                    <button ref={nextRef} onClick={handleNextSlide} aria-label="Next slide"><GoArrowRight /></button>
                </div>
            </div>
            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper}}
                navigation={
                    {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                }
                slidesPerView={"auto"}
                spaceBetween={30}
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

                {news.map((news, index) => (
                    <SwiperSlide key={index} className={styles.swiper__slide}>
                        <NewsCard news={news} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperNews