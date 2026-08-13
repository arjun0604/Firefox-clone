import { useState, useEffect } from "react"

interface Article {
    title: string;
    url: string;
    urlToImage: string;
    source: { name: string };
}

export default function NewsFetch() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchdata() {
            try {
                const response = await fetch("/api/news/v2/top-headlines?country=us&apiKey=0645a4d0f53a44c5b0a1cf1fabfbe8a6");
                if (!response.ok) {
                    throw new Error("Data could not be loaded");
                }
                const responseData = await response.json();
                setArticles(responseData.articles.filter((article: Article) =>
                    article.title !== "[Removed]" && article.urlToImage
                ));
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        fetchdata();
    }, []);

    if (loading) {
        return <p className="text-center py-6 text-gray-400">Loading Articles...</p>;
    }

    if (error) {
        return <p className="text-center py-6 text-red-500">Failed to load news: {error}</p>;
    }

    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-7 relative">
            {articles.map((article, index) => {
                const cleanTitle = article.title.split(" - ").slice(0, -1).join(" - ");
                const domain = new URL(article.url).hostname;
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                return (
                    <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-[#312B47] flex flex-col">
                        <img src={article.urlToImage} alt={cleanTitle} className="rounded-t-2xl h-40 w-full object-cover" />
                        <h2 className="pt-3 pr-3 pl-3 font-bold flex-1">{cleanTitle}</h2>
                        <div className="flex items-center gap-2 p-3 pt-2">
                            <img src={faviconUrl} alt={article.source.name} className="w-5 h-5 rounded-full" />
                            <p title={article.source.name} className="text-sm text-gray-300">{article.source.name}</p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}