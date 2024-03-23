import React from 'react'
import styles from "./style.module.scss"
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

import Link from 'next/link';

const index = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <section className={styles.footer__container__section}>
                    <div className={styles.footer__container__section_svg}>
                        <Link href="https://www.facebook.com/"><FaFacebookF /></Link>
                        <Link href="https://www.instagram.com/"><BsInstagram /></Link>
                        <Link href="https://www.linkedin.com/"><FaLinkedinIn /></Link>
                        <Link href="https://www.youtube.com/"><BsYoutube /></Link>
                        <Link href="https://www.twitter.com/"><BsTwitterX /></Link>
                        <Link href="https://www.tiktok.com/"><BsTiktok /></Link>
                        <Link href="https://www.snapchat.com/"><BsSnapchat /></Link>
                    </div>
                </section>
                <section className={styles.footer__container__section}>
                    <h2>Contact</h2>
                    <address className={styles.footer__container__section_list}>
                        Address: 1234 Street Name, City Name, United States<br />
                        Phone: <Link href="tel:+1234567890">+123 456 7890</Link><br />
                        Email: <Link href="mailto:email@example.com">email@example.com</Link>
                    </address>
                </section>
                <nav className={styles.footer__container__section}>
                    <h2>About Us</h2>
                    <ul className={styles.footer__container__section_list}>
                        <li><Link href="/vision">Vision & Mission</Link></li>
                        <li><Link href="/story">Our Story</Link></li>
                        <li><Link href="/team">Our Team</Link></li>
                    </ul>
                </nav>
                <nav className={styles.footer__container__section}>
                    <h2>Services</h2>
                    <ul className={styles.footer__container__section_list}>
                        <li><Link href="/process">Our Process</Link></li>
                    </ul>
                </nav>
                <section className={styles.footer__container__section}>
                    <h2>Our News</h2>
                </section>
            </div>
        </footer>
    )
}

export default index