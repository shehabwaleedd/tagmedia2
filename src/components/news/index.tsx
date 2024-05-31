import { serverUseNews } from '@/lib/serverAllNews';
import "@/components/news/NewsHomePage.scss"
import { NewsType } from '@/types/common';
import NewsCard from '../card';
import Slider from '../swiper';
import Link from 'next/link';

const content = (news: NewsType[]) => {

    return (
        <>
                {news.map((news, index) => (
                    <div key={index} className={`keen-slider__slide`}>
                        <NewsCard news={news} />
                    </div>
                ))}
        </>
    )

}
export default async function NewsHomePage() {

    const news = await serverUseNews();

    const spliceNews = news?.splice(0, 6);



    if (!news) {
        return null;
    }
    

    return (
        <section className="newsHomePage">
            <div className="newsHomePage__upper">
                <h2>Our News</h2>
            </div>
            <Slider content={content(spliceNews)} />
            <Link href="/news" aria-label="View More News" className="moreNews">
                <span className="newsHomePage__btn">View More News</span>
            </Link>
        </section>
    )
}
