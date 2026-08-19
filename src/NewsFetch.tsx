import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';

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


export default function NewsFetch() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const validateImage = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.referrerPolicy = "no-referrer";
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      };
      

    useEffect(() => {
        async function fetchdata() {
            try {
                const response = await fetch("/api/news/v2/top-headlines?country=us&apiKey=0645a4d0f53a44c5b0a1cf1fabfbe8a6");
                if (!response.ok) {
                    throw new Error("Data could not be loaded");
                }
                const responseData = await response.json();
                const initialArticles = responseData.articles.filter(
                    (article: Article) => article.title !== "[Removed]" && article.urlToImage
                );
                  
                const validatedArticles = await Promise.all(
                    initialArticles.map(async (article: Article) => {
                        const isValid = await validateImage(article.urlToImage);
                        return isValid ? article : null;
                    })
                );
                  
                setArticles(
                    validatedArticles
                    .filter((article): article is Article => article !== null)
                    .slice(0, 16)
                );
                  
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        fetchdata();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative w-full">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-3xl bg-[#312B47] flex flex-col h-70 overflow-hidden">
                        <Skeleton className="h-40 w-full bg-gray-600/50 rounded-none" />
                        <div className="p-3 flex-1 flex flex-col gap-2">
                            <Skeleton className="h-4 w-full bg-gray-600/50" />
                            <Skeleton className="h-4 w-2/3 bg-gray-600/50" />
                        </div>
                        <div className="flex items-center gap-2 p-3 pt-2">
                            <Skeleton className="w-5 h-5 rounded-full bg-gray-600/50" />
                            <Skeleton className="h-3 w-20 bg-gray-600/50" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center py-6 text-red-500">Failed to load news: {error}</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {articles.map((article, index) => {
                const cleanTitle = article.title.split(" - ").slice(0, -1).join(" - ");
                const domain = new URL(article.url).hostname;
                const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                return (
                    <Link 
                        key={index} 
                        to={`/news/${index}`} 
                        state={{ article }} 
                        className="rounded-3xl bg-[#312B47] flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3A]"
                    >
                        <img src={article.urlToImage} alt={cleanTitle} referrerPolicy="no-referrer" className="rounded-t-2xl h-40 w-full object-cover" />
                        <h2 className="pt-3 pr-3 pl-3 font-bold flex-1">{cleanTitle}</h2>
                        <div className="flex items-center gap-2 p-3 pt-2">
                            <img src={faviconUrl} alt={article.source.name} className="w-5 h-5 rounded-full" />
                            <p title={article.source.name} className="text-sm text-gray-300">{article.source.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}