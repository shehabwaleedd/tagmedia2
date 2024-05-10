'use client'
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.scss"
import { usePathname } from 'next/navigation';

const WhatsappIcon = () => {
    const isAccountPage = usePathname().includes('/account');
    return (
        <section className={styles.whatsapp} style={{ display: isAccountPage ? "none" : "" }}>
            <a href="whatsapp://send?text=Hello, I want&phone=+201224202031" target="_blank" rel="noreferrer">
                <FaWhatsapp />
            </a>
        </section>
    )
}

export default WhatsappIcon