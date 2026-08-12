import firefoxLogo from "./assets/firefox_logo.svg";
import googleLogo from "./assets/Google_round.png";

function Header(){
    return(
        <>  
            <img 
                src={firefoxLogo} 
                className="bg-center bg-no-repeat w-[120px] h-[56px] m-0"
            />
            <div className="relative flex justify-center">
                <img 
                    src={googleLogo} 
                    className="absolute h-[35px] w-[35px] z-10 top-1/2 -translate-y-1/2 left-[calc(50%-338px+10px)]"
                />
                <input 
                    className="m-[10px] w-[675px] rounded-[18px] bg-white py-[11px] pr-[11px] pl-[44px] border-none outline-none text-black" 
                    type="text" 
                    placeholder="Search with Google or enter address"
                />
            </div>
        </>
    );
}

export default Header