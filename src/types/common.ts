export interface NewsType {
    title: string
    subTitle: string
    mainImg: MainImg;
    images: MainImg[];
    date: string;
    link: string;
    _id: string;
    news?: string;
    category: string;
    author: string;
    createdAt: string;
    tags: string[];
    section: Section[];
}

export interface Section {
    title: string
    subTitle: string
    description: string
}


export interface MainImg {
    url: string;
    public_id: string;
}


export interface ImageFile {
    file: File | string; // File for uploads, string for existing URLs
    previewUrl: string; // URL for displaying the image
}