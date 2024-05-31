import Image from 'next/image'
import styles from '@/animation/marquee/style.module.scss'

const MarqueeContent = (content: any) => {
    return (
        <div className={styles.marquee_content}>
            <div className={styles.marquee_partners}>
                {content && content.map((partner: any, index: number) => (
                    <div key={index} className={styles.marquee_partner}>
                        <Image src={partner.image.url} alt={partner.name} width={600} height={600} title={partner.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MarqueeContent
