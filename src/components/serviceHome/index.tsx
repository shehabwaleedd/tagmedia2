import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image'

const index = () => {
    const data = [
        {
            title: "Visual Branding",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla ab vel laudantium tenetur itaque dolor perferendis a dolorem vitae cumque?",
            image: "/assets/services/VISUAL icon.png"
            
        },
        {
            title: "Digital Marketing Strategy",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla ab vel laudantium tenetur itaque dolor perferendis a dolorem vitae cumque?",
            image: "/assets/services/DIGITAL icon.png"
        },
        {
            title: "Media Production",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla ab vel laudantium tenetur itaque dolor perferendis a dolorem vitae cumque?",
            image: "/assets/services/Media icon.png"
        },
        {
            title: "Content Creation",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla ab vel laudantium tenetur itaque dolor perferendis a dolorem vitae cumque?",
            image: "/assets/services/CONTENT icon.png"
        }
    ]
    return (
        <section className={styles.ServicesHome}>
            <h1>Our Services</h1>
            <div className={styles.ServicesHome__container}>
                {data.map((service, index) => {
                    return (
                        <div key={index} className={styles.ServicesHome__container__service}>
                            <Image src={service.image} alt={service.title} width={100} height={100} />
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    )
                })}
            </div> 
        </section>
    )
}

export default index