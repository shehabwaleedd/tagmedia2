import React from 'react'
import styles from './style.module.scss'
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
interface Partner {
    src: string;
    name: string;
}


const defaultPartners: Partner[] = [
    { src: "/assets/stars/Batool Elhadad.webp", name: "Batool Elhadad" },
    { src: "/assets/stars/Hany Shaker.webp", name: "Hany Shaker" },
    { src: "/assets/stars/DINA FOAAD.webp", name: "Dina Foad" },
    { src: "/assets/stars/Hager Elsharnouby.webp", name: "Hager Elsharnouby" },
    { src: "/assets/stars/Malak Ahmed Zaher.webp", name: "Malak Ahmed Zaher" },
    { src: "/assets/stars/AMR ABDULGLIL.webp", name: "Amr Abdulgelil" },
    { src: "/assets/stars/Laila Ahmed Zaher.webp", name: "Laila Ahmed Zaher" },
    { src: "/assets/stars/HASSAN ELRADDAD.webp", name: "Hassan Elraddad" },
    { src: "/assets/stars/Ahmed Gamal Saied.webp", name: "Ahmed Gamal Saied" },
    { src: "/assets/stars/Safaa Galal.webp", name: "Safaa Galal" },
    { src: "/assets/stars/Lekaa Swidan.webp", name: "Lekaa Swidan" },
    { src: "/assets/stars/AHMED ZAHER.webp", name: "Ahmed Zaher" },
    { src: "/assets/stars/Caroline Azmy.webp", name: "Caroline Azmy" },
    { src: "/assets/stars/Amr Saad.webp", name: "Amr Saad" },
];


const Announcment = () => {
    return (
        <div className={styles.marquee}>
            <h2>Our Partners</h2>
            <Marquee  gradient={false} speed={50} pauseOnHover={true}>
                <div className={styles.marquee_content}>
                    <div className={styles.marquee_partners}>
                        {defaultPartners.map((partner, index) => (
                            <div key={index} className={styles.marquee_partner}>
                                <Image src={partner.src} alt={partner.name} width={600} height={600}title={partner.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Marquee>
        </div>
    )
}

export default Announcment
