import { useState, type KeyboardEvent } from "react";
import firefoxLogo from "./assets/firefox_logo.svg";
import googleLogo from "./assets/Google_round.png";

function Header(){
    const [query, setQuery] = useState("");

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        }
    };

    return(
        <>  
            <img 
                src={firefoxLogo} 
                className="w-32 h-14 m-5"
            />
        <div className="flex justify-center mt-4">
                <div className="relative w-full max-w-2xl px-4">
                    <img 
                        src={googleLogo} 
                        className="absolute h-7 w-7 sm:h-8 sm:w-8 left-7 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input 
                        className="w-full rounded-2xl bg-[#2B2A3A] py-2.5 sm:py-3 pr-3 pl-12 sm:pl-14 border-none outline-none text-white text-sm sm:text-base shadow-sm" 
                        type="text" 
                        placeholder="Search with Google or enter address"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>
        </>
    );
}

export default Header