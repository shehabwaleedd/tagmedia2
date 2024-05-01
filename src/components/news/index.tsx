import { serverUseNews } from '@/lib/serverAllNews';
import SwiperNews from '../swiperNews';
import styles from './style.module.scss'
export default async function NewsHomePage() {

    const news = await serverUseNews();

    if (!news) {
        return null;
    }
    

    return (
        <section className={styles.newsHomePage}>
            <SwiperNews news={news} />
        </section>
    )
}
