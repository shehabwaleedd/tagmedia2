import React from 'react';
import styles from "./style.module.scss";
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__section}>
                    <Image src="/logo2.png" width={100} height={100} alt='logo' />
                    <h2>Tag Media</h2>
                </div>
                <address className={styles.footer__section}>
                    225 B Gardenia Street - Hadayk Al-Ahram, First Gate<br />
                    <Link href="tel:+1234567890">+123 456 7890</Link><br />
                    <Link href="mailto:email@example.com">email@example.com</Link>
                </address>
                <nav className={styles.footer__section}>
                    <ul>
                        <li><Link href="/services">Our Services</Link></li>
                        <li><Link href="/services">Our News</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
                <div className={styles.footer__section}>
                    <ul className={styles.footer__social}>
                        <li><Link href="https://www.facebook.com/" aria-label="Facebook's Account Link"><FaFacebookF /></Link></li>
                        <li><Link href="https://www.instagram.com/" aria-label="Instagram's Account Link"><BsInstagram /></Link></li>
                        <li><Link href="https://www.linkedin.com/" aria-label="LinkedIn's Account Link"><FaLinkedinIn /></Link></li>
                        <li><Link href="https://www.youtube.com/" aria-label="YouTube's Account Link"><BsYoutube /></Link></li>
                        <li><Link href="https://www.twitter.com/" aria-label="Twitter's Account Link"><BsTwitterX /></Link></li>
                        <li><Link href="https://www.tiktok.com/" aria-label="TikTok's Account Link"><BsTiktok /></Link></li>
                        <li><Link href="https://www.snapchat.com/" aria-label="Snapchat's Account Link"><BsSnapchat /></Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer__bottom}>
                <p>&copy; {new Date().getFullYear()} Tag Media. All rights reserved.</p>

                <p >
                    Made by <a href="https://cairo-studio.com" target="_blank" rel="noopener noreferrer" aria-label="Cairo Studio's Website">Cairo Studio</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
