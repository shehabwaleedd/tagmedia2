import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.scss"
const WhatsappIcon = () => {
    return (
        <section className={styles.whatsapp}>
            <a href="whatsapp://send?text=Hello, I want&phone=+201224202031" target="_blank" rel="noreferrer">
                <FaWhatsapp />
            </a>
        </section>
    )
}

export default WhatsappIcon