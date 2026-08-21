import { useState, type KeyboardEvent } from "react";
import googleLogo from "./assets/Google_round.png";

function Header(){
    const [query, setQuery] = useState("");


    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
            setQuery('');
        }
    };

    return(
        <>  
            <div className="flex items-center gap-3 m-5">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/960px-Firefox_logo%2C_2019.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" 
                    alt="Firefox Logo"
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none"
                />
                <span className="text-white text-2xl sm:text-[26px] font-bold tracking-tight select-none font-brand">
                    Firefox
                </span>
            </div>
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