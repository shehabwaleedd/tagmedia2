import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'


const ServicesLanding = () => {

    const data = [
        {
            title: "Media Production",
            description: "We provide high quality media production services to help you create the perfect content for your brand.",
        },
        {
            title: "Visual Branding",
            description: "Our team of experienced designers can help you create a unique visual brand identity to help your brand stand out.",
        },
        {
            title: "Content Creation",
            description: "We offer a wide range of content creation services to help you create engaging content for your brand.",
        },
        {
            title: "Digital Marketing Strategy",
            description: "Our team of experienced digital marketers can help you create a custom digital marketing strategy to help you reach your target audience.",
        },
        {
            title: "Community Management",
            description: "We offer community management services to help you engage with your audience and build a loyal community around your brand.",
        },
        {
            title: "Influencer Management",
            description: "Our team of experienced influencer managers can help you identify and work with the right influencers to help promote your brand.",
        },
    ]

    return (
        <section className={styles.landing} >
            <div className={styles.landing__container}>
                <div className={styles.landing__container__content}>
                    <h1>Our Services</h1>
                    <div className={styles.landing__container__content_grid}>
                        {data.map((item, index) => (
                            <div key={index} className={styles.landing__container__content_grid_card}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.landing__lower}>
                <div className={styles.landing__lower__content}>
                    <h2>Our Process</h2>
                    <p>We work according to an integrated business plan</p>
                </div>
                <Image src="/assets/process.png" alt="Process" width={1000} height={1000} />
            </div>
        </section>
    )
}

export default ServicesLanding