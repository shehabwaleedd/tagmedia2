import React from 'react'
import styles from "./style.module.scss"
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

import Link from 'next/link';
import Image from 'next/image';

const index = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <section className={styles.footer__container__section}>
                    <div className={styles.column}>
                        <Image src="/logo2.png" width={500} height={500} alt='logo' />
                        <h2>Tag Media</h2>
                    </div>
                </section>
                <section className={styles.footer__container__section}>
                    <address className={styles.footer__container__section_list}>
                        Address: 225 B Gardenia Street - Hadayk Al-Ahram, First Gate<br />
                        Phone: <Link href="tel:+1234567890">+123 456 7890</Link><br />
                        Email: <Link href="mailto:email@example.com">email@example.com</Link>
                    </address>
                </section>
                <nav className={styles.footer__container__section}>
                    <ul className={styles.footer__container__section_list}>
                        <li><Link href="/services">Our Services</Link></li>
                        <li><Link href="/services">Our News</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
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
            </div>
        </footer>
    )
}

export default index