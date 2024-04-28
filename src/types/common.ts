export interface NewsType {
    title: string
    subTitle: string
    mainImg: MainImg
    date: string
    link: string
    _id: string
    news?: string;
    category: string;
    author: string;
    createdAt: string;
}


export interface MainImg {
    url: string;
    public_id: string;
}