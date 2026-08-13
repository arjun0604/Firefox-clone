import firefoxLogo from "./assets/firefox_logo.svg";
import googleLogo from "./assets/Google_round.png";

function Header(){
    return(
        <>  
            <img 
                src={firefoxLogo} 
                className="bg-center bg-no-repeat w-32 h-14 m-5"
            />
            <div className="flex justify-center mt-4">
                <div className="relative w-full max-w-2xl px-4">
                    <img 
                        src={googleLogo} 
                        className="absolute h-8 w-8 left-7 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input 
                        className="w-full rounded-2xl bg-[#2B2A3A] py-3 pr-3 pl-14 border-none outline-none text-white shadow-sm" 
                        type="text" 
                        placeholder="Search with Google or enter address"
                    />
                </div>
            </div>
        </>
    );
}

export default Header