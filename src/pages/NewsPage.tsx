import {useState, useEffect} from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, User, Sun, Moon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchNews } from "../store/newSlice";


function stripHtml(text: string): string {
    return text
        .replace(/<[^>]*>/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\[\+\d+\s+chars\]/, "")
        .replace(/\s+/g, " ")
        .trim();
}

export default function NewsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state)=>state.news.article);

    const [isDark, setIsDark] = useState<boolean>(() => {
        return localStorage.getItem("news-dark-mode") === "true";
    });

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next=!prev;
            localStorage.setItem("news-dark-mode", String(next));
            return next;
        });
    };

    useEffect(() => {
        const previousBodyBg = document.body.style.backgroundColor;
        const previousHtmlBg = document.documentElement.style.background;

        const currentBg = isDark ? "#121212" : "#FDFDFD";
        document.body.style.backgroundColor = currentBg;
        document.documentElement.style.background = currentBg;

        return () => {
            document.body.style.backgroundColor = previousBodyBg;
            document.documentElement.style.background = previousHtmlBg;
        };
    },[isDark]);

    useEffect(() => {
        if (articles.length === 0) {
          dispatch(fetchNews());
        }
    }, [dispatch, articles.length]);
    
    const index=id ? parseInt(id,10):0;
    const article=articles[index] || location.state?.article;

    const rawText = article?.content || article?.description || "No full content available.";
    const cleanStoryText = stripHtml(rawText);

    const formattedDate = article?.publishedAt 
        ? new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        : null;

    return (
        <div className={`min-h-screen overscroll-y-none transition-colors duration-200 ${
            isDark ? "bg-[#121212] text-gray-100" : "bg-[#FDFDFD] text-slate-900"}`}>
            <header className={`sticky top-0 z-10 backdrop-blur-md border-b transition-colors ${
                isDark ? "bg-[#181818]/90 border-gray-800 text-white" : "bg-white/90 border-gray-200 text-slate-900"}`}>
                <div className="relative w-full h-16">
                    <button
                        onClick={() => navigate("/")}
                        className={`absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-semibold transition cursor-pointer ${
                            isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>

                    <div className="max-w-3xl mx-auto px-6 h-full flex items-center">
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                            {formattedDate && (
                                <span className={`flex items-center gap-1 font-normal normal-case ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                }`}>
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className={`absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 p-2 rounded-xl border transition cursor-pointer ${
                            isDark 
                                ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700" 
                                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-10"> 
                <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4 ${
                    isDark ? "text-white" : "text-gray-900"}`}>
                    {article?.title}
                </h1>


                {article?.author && (
                    <div className={`flex items-center gap-2 text-sm mb-8 pb-4 border-b ${
                        isDark ? "text-gray-400 border-gray-800" : "text-gray-600 border-gray-100"}`}>
                        <User className="w-4 h-4" />
                        <span>By <strong className={isDark ? "text-gray-200" : "text-gray-900"}>{article.author}</strong></span>
                    </div>
                )}

                {article?.urlToImage && (
                    <div className="mb-8">
                        <div className={`overflow-hidden rounded-2xl shadow-sm border ${
                    isDark ? "border-gray-800" : "border-gray-200"}`}>                            
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                referrerPolicy="no-referrer"
                                className="w-full max-h-110 object-cover"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 px-1 text-right">
                            Photo & coverage via {article?.source?.name || "Publisher"}
                        </p>
                    </div>
                )}

                
                <div className={`text-lg sm:text-xl leading-relaxed font-normal space-y-4 mb-10 ${
                    isDark ? "text-gray-300" : "text-gray-800"
                }`}>
                    <p>{cleanStoryText}</p>
                </div>



                <div className={`mt-10 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isDark ? "bg-gray-900 border-gray-800" : "bg-blue-50/60 border-blue-100"}`}>
                    <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Want to read the complete uncut story?</h4>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Continue on {article?.source?.name || "the publisher's website"}.</p>
                    </div>
                    <a
                        href={article?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm hover:shadow shrink-0"
                    >
                        Read on {article?.source?.name || "Source"}
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </main>
        </div>
    );
}
