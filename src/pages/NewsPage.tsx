import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, User, Globe } from "lucide-react";

export default function NewsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const article = location.state?.article;

    const cleanContent = article?.content 
        ? article.content.replace(/\[\+\d+\s+chars\]/, "") 
        : "";

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
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 overscroll-y-none">
            <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200">
                <div className="relative w-full h-16">
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                    <div className="max-w-3xl mx-auto px-6 h-full flex items-center">
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                            <span className="bg-gray-50 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                                {article?.source?.name || "News"}
                            </span>
                            {formattedDate && (
                                <span className="flex items-center gap-1 text-gray-500 font-normal normal-case">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-10">
                

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                    {article?.title}
                </h1>

                {article?.author && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 pb-4 border-b border-gray-100">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>By <strong className="text-gray-900">{article.author}</strong></span>
                    </div>
                )}

                {article?.urlToImage && (
                    <div className="mb-8">
                        <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-200">
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

                
                <div className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal space-y-4 mb-10">
                    <p>
                        {cleanContent || article?.description || "No full content available."}
                    </p>
                </div>


                <div className="mt-10 p-6 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="font-semibold text-gray-900">Want to read the complete uncut story?</h4>
                        <p className="text-sm text-gray-600">Continue on {article?.source?.name || "the publisher's website"}.</p>
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
