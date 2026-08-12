import firefoxLogo from "./assets/firefox_logo.svg";
import googleLogo from "./assets/Google_round.png";

function Header(){
    return(
        <>  
            <img 
                src={firefoxLogo} 
                className="bg-center bg-no-repeat w-[120px] h-[56px] m-5"
            />
            <div className="flex justify-center mt-4">
                <div className="relative w-[675px]">
                    <img 
                        src={googleLogo} 
                        className="absolute h-[30px] w-[30px] left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input 
                        className="w-full rounded-[18px] bg-white py-[11px] pr-[11px] pl-[48px] border-none outline-none text-black shadow-sm" 
                        type="text" 
                        placeholder="Search with Google or enter address"
                    />
                </div>
            </div>
        </>
    );
}

export default Header