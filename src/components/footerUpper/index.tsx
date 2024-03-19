import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
const index = () => {
    return (
        <section className={styles.footerUpper}>
            <Image src="/assets/footerUpper.webp" alt="footerUpper" height={1000} width={1000} />
            <div className={styles.footerUpper_text}>
                <h2>Get in touch with us</h2>
                <a href="/contact"> Start Your Business </a>
            </div>
        </section>
    )
}

export default index