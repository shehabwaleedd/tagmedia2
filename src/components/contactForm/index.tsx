import React from 'react'
import styles from "@/components/contact/style.module.scss"

const index = () => {
    return (
        <div className={styles.contactHomePage__container}>
            <div className={styles.contactHomePage__container__left}>
                <div className={styles.contactHomePage__container__left_header}>
                    <h3>Address</h3>
                    <p>225 B Gardenia Street - Hadayk Al-Ahram, First Gate</p>
                </div>
                <div className={styles.contactHomePage__container__left_header}>
                    <h3>Call Us</h3>
                    <a href="tel:201128989894">+201128989894</a>
                    <a href="tel:0216809142">+0216809142</a>
                </div>
                <div className={styles.contactHomePage__container__left_header}>
                    <h3>Email</h3>
                    <a href="mailto:digital@tagmediaeg.com">
                        Digital@tagmediaeg.com
                    </a>
                </div>
            </div>
            <form className={styles.contactHomePage__container__right}>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Message"></textarea>
                <button>Send Message</button>
            </form>
        </div>
    )
}

export default index