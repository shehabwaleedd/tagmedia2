'use client'
import React, { useState, useEffect } from 'react'
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

interface Partner {
    src: string;
    name: string;
}
const defaultPartners: Partner[] = [
    { src: "/assets/stars/1.webp", name: "static background" },
    { src: "/assets/stars/2.webp", name: "static background" },
    { src: "/assets/stars/AHMED ZAHER.webp", name: "Ahmed Zaher" },
    { src: "/assets/stars/AMR ABDULGLIL.webp", name: "Amr Abdulgelil" },
    { src: "/assets/stars/AMR SAAD.webp", name: "Amr Saad" },
    { src: "/assets/stars/CAROLINE AZMY.webp", name: "Caroline Azmy" },
    { src: "/assets/stars/DINA FOAAD.webp", name: "Dina Foad" },
    { src: "/assets/stars/HANY SHAKER.webp", name: "Hany Shaker" },
    { src: "/assets/stars/HASSAN ELRADDAD.webp", name: "Hassan Elraddad" },
    { src: "/assets/stars/MAI OMAR.webp", name: "Mai Omar" },
];

const Partners = () => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [partners, setPartners] = useState<Partner[]>(defaultPartners);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPartners(defaultPartners.slice(2));
            } else {
                setPartners(defaultPartners);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <section className={styles.partners}>
            <h2>
                Our Partners
            </h2>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                onSwiper={setSwiper}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: -10,
                    },

                    768: {
                        slidesPerView: 4,
                        spaceBetween: -10,

                    },
                    1888: {
                        slidesPerView: 5,
                        spaceBetween: -10,

                    }
                }}
                className={styles.partners__container}>
                {partners.map((partner, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.partners__container__slide}>
                            <Image src={partner.src} alt={partner.name} width={200} height={200} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        </section>
    )
}

export default Partners