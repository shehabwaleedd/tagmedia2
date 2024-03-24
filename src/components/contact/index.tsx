import React from 'react'
import styles from "./style.module.scss"
import ContactForm from "@/components/contactForm"
const index = () => {
    return (
        <section className={styles.contactHomePage}>
            <h2>Keep In Touch</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatibus.</p>
            <ContactForm />
        </section>
    )
}

export default index