import axios from "axios";

export interface Article {
    title: string;
    url: string;
    urlToImage: string;
    description?: string;
    content?: string;
    author?: string;
    publishedAt?: string;
    source: { name: string };
}

const apiClient = axios.create({
    baseURL : "/api/news/v2",
    timeout : 10000,
});

export const getHeadlines=async(): Promise<Article[]> => {
    const apiKey=import.meta.env.VITE_NEWS_API_KEY;
    const response=await apiClient.get("/top-headlines", {
        params: {
            country: "us",
            apiKey: apiKey,
        },
    });

    const rawArticles=response.data.articles || [];
    return rawArticles.filter(
        (art: Article) => 
            art.title!=="[Removed]" &&
            art.urlToImage &&
            !art.urlToImage.includes("usatoday.com") &&
            !art.urlToImage.includes("gcdn")
    ).slice(0,16);
};