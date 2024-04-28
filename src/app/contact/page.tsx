import React from 'react'
import Image from 'next/image'
import styles from "./page.module.scss"
import ContactForm from "@/components/contactForm"
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
const page = () => {
    return (
        <main className={styles.contact}>
            <section className={styles.contact__container}>
                <Image src="/assets/covers/contact cover.webp" alt="Landing" width={1800} height={1080} />
                <div className={styles.contact__container__content}>
                    <h1>Keep in touch</h1>
                    <p> Let&apos;s work together to create something unique. </p>
                    <div className={styles.divider}></div>
                    <ContactForm />
                </div>
            </section>
            <section className={styles.contact__container__section}>
                <h2> KEEP IN TOUCH WITH US <br /> ON SOCIAL MEDIA</h2>
                <div className={styles.contact__container__section_svg}>
                    <Link href="https://www.facebook.com/"><FaFacebookF /></Link>
                    <Link href="https://www.instagram.com/"><BsInstagram /></Link>
                    <Link href="https://www.linkedin.com/"><FaLinkedinIn /></Link>
                    <Link href="https://www.youtube.com/"><BsYoutube /></Link>
                    <Link href="https://www.twitter.com/"><BsTwitterX /></Link>
                    <Link href="https://www.tiktok.com/"><BsTiktok /></Link>
                    <Link href="https://www.snapchat.com/"><BsSnapchat /></Link>
                </div>
            </section>
        </main>
    )
}

export default page